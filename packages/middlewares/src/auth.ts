// packages/auth-middleware/src/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, sign } from 'jsonwebtoken';
interface User {
  id?: string;
  name: string;
  email: string;
  role?: string;
}

const secretKey = process.env.SECRET as string; // Move this to a safer place

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded as User;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    authMiddleware(req, res, () => {
      const user = req.user as User;
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied' });
      }
      next();
    });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const generateJWT = (user: User) => {
  try {
    const {id, name, email, role} = user

    const accessToken = sign(
      {id, name, email, role},
      (secretKey),
      { expiresIn: "1h" }
    );

    return accessToken
  } catch (error) {
    return "Failed to generate access token"
  }
}