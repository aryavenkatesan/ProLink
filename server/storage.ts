import { users, students, professionals, matches, type User, type Student, type Professional, type Match, type InsertUser, type InsertStudent, type InsertProfessional, type InsertMatch } from "@shared/schema";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createStudent(student: InsertStudent): Promise<Student>;
  getStudent(id: string): Promise<Student | undefined>;
  getAllStudents(): Promise<Student[]>;
  
  createProfessional(professional: InsertProfessional): Promise<Professional>;
  getProfessional(id: string): Promise<Professional | undefined>;
  getAllProfessionals(): Promise<Professional[]>;
  
  createMatch(match: InsertMatch): Promise<Match>;
  getMatchesForStudent(studentId: string): Promise<Match[]>;
  getMatchesForProfessional(professionalId: string): Promise<Match[]>;
  
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  public sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const [student] = await db
      .insert(students)
      .values(insertStudent)
      .returning();
    return student;
  }

  async getStudent(id: string): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student || undefined;
  }

  async getAllStudents(): Promise<Student[]> {
    return await db.select().from(students);
  }

  async createProfessional(insertProfessional: InsertProfessional): Promise<Professional> {
    const [professional] = await db
      .insert(professionals)
      .values(insertProfessional)
      .returning();
    return professional;
  }

  async getProfessional(id: string): Promise<Professional | undefined> {
    const [professional] = await db.select().from(professionals).where(eq(professionals.id, id));
    return professional || undefined;
  }

  async getAllProfessionals(): Promise<Professional[]> {
    return await db.select().from(professionals);
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const [match] = await db
      .insert(matches)
      .values(insertMatch)
      .returning();
    return match;
  }

  async getMatchesForStudent(studentId: string): Promise<Match[]> {
    return await db.select().from(matches).where(eq(matches.studentId, studentId));
  }

  async getMatchesForProfessional(professionalId: string): Promise<Match[]> {
    return await db.select().from(matches).where(eq(matches.professionalId, professionalId));
  }
}

export const storage = new DatabaseStorage();
