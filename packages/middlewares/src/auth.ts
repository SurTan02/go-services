// packages/auth-middleware/src/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, sign } from 'jsonwebtoken';

const secretKey = process.env.SECRET as string; // Move this to a safer place

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const generateJWT = (name: string, email: string, id: string) => {
  try {
    const accessToken = sign(
      {name, email, id},
      (secretKey),
      { expiresIn: "1h" }
    );

    return accessToken
  } catch (error) {
    return "Failed to generate access token"
  }
}