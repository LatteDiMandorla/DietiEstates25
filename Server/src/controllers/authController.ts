import { NextFunction, Request, Response } from "express";
import { AuthServiceLocal } from "../services/authServiceLocal";
import { AuthServiceGoogle } from "../services/authServiceGoogle";

export class AuthController {
    private authService : AuthServiceLocal | undefined;
    private authServiceGoogle : AuthServiceGoogle | undefined;

    constructor() {
        this.authService = new AuthServiceLocal();
        this.authServiceGoogle = new AuthServiceGoogle();
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if(!email || !password || typeof email != "string" || typeof password != "string"){
                res.status(400).json({ error: 'email or password not found' });
            }
            
            const {accessToken, refreshToken} = await this.authService?.login(email, password) as {accessToken: string, refreshToken: string};
            res.status(200).cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: "none", secure: true }).json({accessToken});
        } catch (error) {
          res.sendStatus(401);
        }
    }
    
    public async register(req: Request, res: Response) {
        try {
            const { email, password, image, username, nome, cognome } = req.body;
            if(!email || !password || !username || !cognome || !nome || typeof email != "string" || typeof password != "string" || typeof username != "string" || typeof nome != "string" || typeof cognome != "string"){
                res.status(400).json({ error: 'invalid user' });
                return;
            }

            await this.authService?.register(req.body);
            res.sendStatus(201);
        } catch (error) {
            res.status(400).json({error});
        }
    }
    
    public async refresh(req: Request, res: Response) {
        try {
            const { refreshToken } = req.cookies;
            if(!refreshToken) {
                res.sendStatus(403);
                return;
            }

            const accessToken = await this.authService?.refresh(refreshToken);
            res.status(200).json(accessToken);
        } catch (error) {
            res.status(403).json({error});
        }
    }

    public async googleAuth(req: Request, res: Response, next: NextFunction){
        try {
            const {credential} = req.body;
            const tokens = await this.authServiceGoogle?.login(credential);
            if(tokens && tokens.accessToken && tokens.refreshToken){
                res.status(200).cookie("refreshToken", tokens.refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: "none", secure: true }).json({accessToken: tokens.accessToken});
                return;
            }
        } catch (error) {
            res.sendStatus(401);
        }
    }
}