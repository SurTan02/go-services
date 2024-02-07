import { Request, Response } from 'express';
import { db } from '@repo/middlewares/database';
import { generateJWT } from '@repo/middlewares/auth';
import bcrypt from "bcrypt";

export const Login = async (req: Request, res: Response) => {
  try {
      const { email, phone_number, password } = req.body;
      const users = await db.query(
          "SELECT * from users where email = $1 or phone_number= $2",
          [email, phone_number]
      );

      if (!users || users.rowCount === 0){
        return res.status(401).send({
          message: "There is No such user with email / phone_number"
        });
      }

      // Compare provided password with hashed password in database
      const validPassword = await bcrypt.compare(password, users.rows[0].password);
      if (!validPassword) {
          return res.status(401).send({
              message: "Invalid credential"
          });
      }
      
      const token = generateJWT(users.rows[0].name, email)

      res.status(201).json({
        message: 'User Login successfully',
        token: token
      });

  } catch (error) {
      console.error("Error Login user:", error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

export const Register = async(req: Request, res: Response) => {
  try {
    const { name, password, email, phone_number } = req.body;
    try {
      const isEmailUsed = await db.query(
        "SELECT email from users where email = $1 or phone_number = $2",
        [email, phone_number]
      );
      if (isEmailUsed.rowCount! > 0){
        return res.status(401).json({ error: 'Email / Phone Number Already used' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query('INSERT INTO users(name, password, email, phone_number) VALUES ($1, $2, $3, $4)', 
        [name, hashedPassword, email, phone_number])
      
      const token = generateJWT(name, email)

      res.status(201).json({
        message: 'User registered successfully',
        token: token
      });

    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    
  }
}