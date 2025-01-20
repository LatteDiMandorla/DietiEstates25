// src/middleware/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class AuthMiddleware {
  public verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization'];

    if (!token) {
       res.status(403).json({ message: 'Token mancante!' });
       return;
    }

    const jwtToken = token.split(' ')[1];

    jwt.verify(jwtToken, process.env.JWT_TOKEN_SECRET as string, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token non valido!' });
      }

      // Assegna i dati decodificati a req.user
      res.locals.id = (decoded as jwt.JwtPayload).id;
      // Passa al prossimo middleware o alla route
      next();
    });
  }
}

export default AuthMiddleware;
