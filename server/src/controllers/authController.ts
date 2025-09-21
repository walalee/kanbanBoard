// src/controllers/authController.ts
import { Request, Response } from "express";
import prisma from "../prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_for_dev";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    // **NOTE**: password stored as plaintext (ตามที่ขอ) — ไม่ปลอดภัย
    const user = await prisma.user.create({
      data: { email, password },
      select: { id: true, email: true },
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // เปรียบเทียบตรง ๆ (plaintext)
    if (user.password !== password) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({ user: { id: user.id, email: user.email }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
