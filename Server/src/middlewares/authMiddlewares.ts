// src/middleware/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '../models/AuthT';

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
      res.locals.ruolo = (decoded as jwt.JwtPayload).ruolo;
      // Passa al prossimo middleware o alla route
      next();
    });
  }
  
  public verifyTokenWithRole(ruolo: Role | Role[]) {
    return function(req: Request, res: Response, next: NextFunction): void {
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
        res.locals.ruolo = (decoded as jwt.JwtPayload).ruolo;
        // Passa al prossimo middleware o alla route
        if(Array.isArray(ruolo)){
          if(!ruolo.includes(res.locals.ruolo)){
            return res.status(403).json({message: "Non autorizzato"});
          }
        }
        else if(ruolo !== res.locals.ruolo) {
          return res.status(403).json({message: 'Non autorizzato'});
        }
        next();
      });
    }
  }
}

export default AuthMiddleware;
