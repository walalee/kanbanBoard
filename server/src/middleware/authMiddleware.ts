import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2) return res.status(401).json({ message: "Token error" });

    const token = parts[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: "JWT secret not set" });

    const payload = jwt.verify(token, secret) as any; // { id, email, iat, exp }
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
