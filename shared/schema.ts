import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  resumeUrl: text("resume_url").notNull(),
  interests: text("interests").array().notNull(),
  opportunityTypes: text("opportunity_types").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const professionals = pgTable("professionals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  expertise: text("expertise").array().notNull(),
  availableOpportunities: text("available_opportunities").array().notNull(),
  bio: text("bio").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const matches = pgTable("matches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  professionalId: varchar("professional_id").notNull(),
  score: text("score").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
});

export const insertProfessionalSchema = createInsertSchema(professionals).omit({
  id: true,
  createdAt: true,
});

export const insertMatchSchema = createInsertSchema(matches).omit({
  id: true,
  createdAt: true,
});

export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof students.$inferSelect;

export type InsertProfessional = z.infer<typeof insertProfessionalSchema>;
export type Professional = typeof professionals.$inferSelect;

export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type Match = typeof matches.$inferSelect;

export const FIELD_OPTIONS = [
  "Software Engineering",
  "Data Science",
  "Product Management",
  "Marketing",
  "Finance",
  "Consulting",
  "Healthcare",
  "Education",
  "Design",
  "Sales",
  "Operations",
  "Human Resources",
  "Legal",
  "Research",
  "Entrepreneurship",
] as const;

export const OPPORTUNITY_OPTIONS = [
  "Mentoring",
  "Internship",
  "Job Shadowing",
] as const;
