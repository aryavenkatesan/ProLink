import { type Student, type Professional, type Match, type InsertStudent, type InsertProfessional, type InsertMatch } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createStudent(student: InsertStudent): Promise<Student>;
  getStudent(id: string): Promise<Student | undefined>;
  getAllStudents(): Promise<Student[]>;
  
  createProfessional(professional: InsertProfessional): Promise<Professional>;
  getProfessional(id: string): Promise<Professional | undefined>;
  getAllProfessionals(): Promise<Professional[]>;
  
  createMatch(match: InsertMatch): Promise<Match>;
  getMatchesForStudent(studentId: string): Promise<Match[]>;
  getMatchesForProfessional(professionalId: string): Promise<Match[]>;
}

export class MemStorage implements IStorage {
  private students: Map<string, Student>;
  private professionals: Map<string, Professional>;
  private matches: Map<string, Match>;

  constructor() {
    this.students = new Map();
    this.professionals = new Map();
    this.matches = new Map();
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = randomUUID();
    const student: Student = { 
      ...insertStudent, 
      id, 
      createdAt: new Date() 
    };
    this.students.set(id, student);
    return student;
  }

  async getStudent(id: string): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getAllStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async createProfessional(insertProfessional: InsertProfessional): Promise<Professional> {
    const id = randomUUID();
    const professional: Professional = { 
      ...insertProfessional, 
      id, 
      createdAt: new Date() 
    };
    this.professionals.set(id, professional);
    return professional;
  }

  async getProfessional(id: string): Promise<Professional | undefined> {
    return this.professionals.get(id);
  }

  async getAllProfessionals(): Promise<Professional[]> {
    return Array.from(this.professionals.values());
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const id = randomUUID();
    const match: Match = { 
      ...insertMatch, 
      id, 
      createdAt: new Date() 
    };
    this.matches.set(id, match);
    return match;
  }

  async getMatchesForStudent(studentId: string): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(
      (match) => match.studentId === studentId
    );
  }

  async getMatchesForProfessional(professionalId: string): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(
      (match) => match.professionalId === professionalId
    );
  }
}

export const storage = new MemStorage();
