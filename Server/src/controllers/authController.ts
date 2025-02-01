import { NextFunction, Request, Response } from "express";
import { AuthServiceLocal } from "../services/authServiceLocal";
import { AuthServiceGoogle } from "../services/authServiceGoogle";
import { Utente } from "../models/UtenteT";
import { RegisterBodyInput } from "../schemas/authSchemas";
import { MailService } from "../services/interfaces/mailService";
import { ServiceFactory } from "../services/factory/serviceFactory";
import { Role } from "../models/AuthT";
import { AgenziaService } from "../services/agenziaService";

export class AuthController {
    private authService : AuthServiceLocal | undefined;
    private authServiceGoogle : AuthServiceGoogle | undefined;
    private mailService: MailService | undefined;
    private agenziaService: AgenziaService | undefined;

    constructor() {
        this.authService = new AuthServiceLocal();
        this.authServiceGoogle = new AuthServiceGoogle();
        this.agenziaService = new AgenziaService();
        const serviceFactory = new ServiceFactory();
        this.mailService = serviceFactory.getMailService(process.env.MAIL_API || "Mailtrap");
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if(!email || !password || typeof email != "string" || typeof password != "string"){
                res.status(400).json({ error: 'email or password not found' });
                return;
            }
            
            const {accessToken, refreshToken, utente, role} = await this.authService?.login(email, password) as {accessToken: string, refreshToken: string, utente: Utente, role: Role};
            res.status(200).cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: "none", secure: true }).json({accessToken, ...utente, role});
        } catch (error) {
          res.sendStatus(401);
        }
    }
    
    public async register(req: Request<{}, {}, RegisterBodyInput & {file?: File}>, res: Response) {
        try {
            await this.authService?.register(req.body);
            await this.mailService?.sendVerificationMail(req.body.email, `${process.env.CLIENT_URL}/auth/verify`);
            res.sendStatus(201);
        } catch (error) {
            res.status(400).json({error});
        }
    }

    public async registerWithoutPassword(req: Request, res: Response, roleToReg: Role){
        const {id, role} = res.locals;
        const {email, nome, cognome} = req.body;
        // if(!id || !role){
        //     res.status(403).send("Non autorizzato");
        //     return;
        // }

        const agenzia = await this.agenziaService?.getAgenziaByAmministrazione(1);
        const user = await this.authService?.registerRole({email, nome, cognome, Agenzia: agenzia}, roleToReg);
        res.sendStatus(200);
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
            const {code} = req.body;
            const tokens = await this.authServiceGoogle?.login(code);
            if(tokens && tokens.accessToken && tokens.refreshToken && tokens.utente){
                res.status(200).cookie("refreshToken", tokens.refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: "none", secure: true }).json({accessToken: tokens.accessToken, ...tokens.utente});
                return;
            }
        } catch (error) {
            res.sendStatus(401);
        }
    }

    public async verify(req: Request, res: Response) {
        try {
            const {token} = req.query;

            if(!token || typeof token != "string"){
                res.sendStatus(401);
                return;
            }

            await this.authService?.verify(token);
            res.sendStatus(200);
        } catch (error) {
            res.status(401).send(error);
        }
    }

    public async resetPassword(req: Request, res: Response) {
        try {
            const {token} = req.query;
            const {password} = req.body;

            if(!token || typeof token != "string" || !password || typeof password !== "string"){
                res.status(401).send("Token o Password mancanti");
                return;
            }

            await this.authService?.resetPassword(token, password);
            res.status(200).send("Successo");
        } catch (error) {
            res.status(401).send(error);
        }
    }

    public async requestResetPassword(req: Request, res: Response) {
        try {
            const {email, callback} = req.body;

            if(!email || typeof email != "string"){
                res.sendStatus(401);
                return;
            }

            const userRole = await this.authService?.findRole(email);
            if(!userRole || !userRole.role) {
                res.status(401).send("Email non registrata");
                return;
            }

            await this.mailService?.sendChangePasswordMail(email, userRole.role, callback);
            res.sendStatus(200);
        } catch (error) {
            res.status(401).send(error);
        }
    }
}