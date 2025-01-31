// src/middleware/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

class ValidationMiddlewares {
  public validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
    });
    
    if (!result.success) {
        res.status(400).json({ error: result.error.format() });
        return;
    }
  
    req.body = {...req.body, ...result.data.body};
    req.query = {...req.query, ...result.data.query};
    req.params = {...req.params, ...result.data.params};
    next();
  }
}

export default ValidationMiddlewares;
