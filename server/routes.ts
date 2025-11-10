import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { insertStudentSchema, insertProfessionalSchema } from "@shared/schema";
import { setupAuth, requireAuth } from "./auth";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, DOC, and DOCX are allowed."));
    }
  },
});

function calculateMatchScore(
  interests1: string[],
  interests2: string[],
  opportunities1: string[],
  opportunities2: string[]
): number {
  const interestOverlap = interests1.filter((interest) =>
    interests2.includes(interest)
  ).length;

  const opportunityOverlap = opportunities1.filter((opp) =>
    opportunities2.includes(opp)
  ).length;

  const totalInterests = Math.max(interests1.length, interests2.length);
  const totalOpportunities = Math.max(opportunities1.length, opportunities2.length);

  const interestScore = totalInterests > 0 ? (interestOverlap / totalInterests) * 60 : 0;
  const opportunityScore = totalOpportunities > 0 ? (opportunityOverlap / totalOpportunities) * 40 : 0;

  return Math.round(interestScore + opportunityScore);
}

async function createMatches(studentId: string) {
  const student = await storage.getStudent(studentId);
  if (!student) return;

  const professionals = await storage.getAllProfessionals();

  for (const professional of professionals) {
    const score = calculateMatchScore(
      student.interests,
      professional.expertise,
      student.opportunityTypes,
      professional.availableOpportunities
    );

    if (score > 0) {
      await storage.createMatch({
        studentId: student.id,
        professionalId: professional.id,
        score: score.toString(),
      });
    }
  }
}

async function createMatchesForProfessional(professionalId: string) {
  const professional = await storage.getProfessional(professionalId);
  if (!professional) return;

  const students = await storage.getAllStudents();

  for (const student of students) {
    const score = calculateMatchScore(
      student.interests,
      professional.expertise,
      student.opportunityTypes,
      professional.availableOpportunities
    );

    if (score > 0) {
      const existingMatches = await storage.getMatchesForStudent(student.id);
      const alreadyMatched = existingMatches.some(
        (match) => match.professionalId === professional.id
      );

      if (!alreadyMatched) {
        await storage.createMatch({
          studentId: student.id,
          professionalId: professional.id,
          score: score.toString(),
        });
      }
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.post("/api/students/register", requireAuth, upload.single("resume"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Resume file is required" });
      }

      const { name, email, phone, interests, opportunityTypes } = req.body;

      const parsedInterests = JSON.parse(interests);
      const parsedOpportunityTypes = JSON.parse(opportunityTypes);

      const validatedData = insertStudentSchema.parse({
        name,
        email,
        phone,
        resumeUrl: `/uploads/${req.file.filename}`,
        interests: parsedInterests,
        opportunityTypes: parsedOpportunityTypes,
      });

      const student = await storage.createStudent(validatedData);

      await createMatches(student.id);

      res.json(student);
    } catch (error: any) {
      console.error("Student registration error:", error);
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  app.get("/api/students/:id", requireAuth, async (req, res) => {
    try {
      const student = await storage.getStudent(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(student);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/students/:id/matches", requireAuth, async (req, res) => {
    try {
      const matches = await storage.getMatchesForStudent(req.params.id);
      
      const matchesWithProfessionals = await Promise.all(
        matches.map(async (match) => {
          const professional = await storage.getProfessional(match.professionalId);
          return {
            ...match,
            professional,
          };
        })
      );

      const sortedMatches = matchesWithProfessionals.sort(
        (a, b) => parseInt(b.score) - parseInt(a.score)
      );

      res.json(sortedMatches);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/professionals/register", requireAuth, async (req, res) => {
    try {
      const validatedData = insertProfessionalSchema.parse(req.body);

      const professional = await storage.createProfessional(validatedData);

      await createMatchesForProfessional(professional.id);

      res.json(professional);
    } catch (error: any) {
      console.error("Professional registration error:", error);
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  app.get("/api/professionals/:id", requireAuth, async (req, res) => {
    try {
      const professional = await storage.getProfessional(req.params.id);
      if (!professional) {
        return res.status(404).json({ message: "Professional not found" });
      }
      res.json(professional);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/professionals/:id/matches", requireAuth, async (req, res) => {
    try {
      const matches = await storage.getMatchesForProfessional(req.params.id);
      
      const matchesWithStudents = await Promise.all(
        matches.map(async (match) => {
          const student = await storage.getStudent(match.studentId);
          return {
            ...match,
            student,
          };
        })
      );

      const sortedMatches = matchesWithStudents.sort(
        (a, b) => parseInt(b.score) - parseInt(a.score)
      );

      res.json(sortedMatches);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
