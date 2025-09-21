import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email?: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2) return res.status(401).json({ message: "Token error" });

    const token = parts[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: "JWT secret not set" });

    const payload = jwt.verify(token, secret) as JwtPayload;
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
