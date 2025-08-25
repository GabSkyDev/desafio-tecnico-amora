import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "api-imoveis";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Token not provided. Register or login to acess this endpoint!" });

  jwt.verify(token, secret, (error, user) => {
    if (error) return res.status(403).json({ message: "Invalid token" });
    (req as any).user = user;
    next();
  });
};