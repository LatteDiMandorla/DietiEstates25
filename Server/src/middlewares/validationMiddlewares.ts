// src/middleware/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

class ValidationMiddlewares {
  public validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    console.log("Prima");
    console.log(req.query);
    const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
    });
    
    if (!result.success) {
        res.status(400).json({ error: result.error.format() });
        return;
    }
    
        console.log("Dopo");
        console.log(result.data.query);
  
    req.body = {...req.body, ...result.data.body};
    req.query = {...req.query, ...result.data.query};
    req.params = {...req.params, ...result.data.params};
    next();
  }
}

export default ValidationMiddlewares;
