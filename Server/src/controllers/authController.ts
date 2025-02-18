import { NextFunction, Request, Response } from "express";
import { AuthServiceLocal } from "../services/authServiceLocal";
import { AuthServiceGoogle } from "../services/authServiceGoogle";
import { LoginBodyInput, RegisterAgenteBodyInput, RegisterClienteBodyInput, RegisterGestoreBodyInput, RegisterSupportoBodyInput } from "../schemas/authSchemas";
import { MailService } from "../services/interfaces/mailService";
import { Role } from "../models/AuthT";
import { AgenziaService } from "../services/agenziaService";
import { UtenteService } from "../services/utenteService";
import { AmministrazioneService } from "../services/amministrazioneService";
import { AgenteService } from "../services/agenteService";
import { TokenService } from "../services/tokenService";
import { ImageService } from "../services/interfaces/imageService";

export class AuthController {
    private readonly authServiceLocal: AuthServiceLocal;
    private readonly authServiceGoogle : AuthServiceGoogle;
    private readonly mailService: MailService;
    private readonly tokenService: TokenService<{id: number, ruolo: Role}>;

    private readonly utenteService: UtenteService;
    private readonly agenteService: AgenteService;
    private readonly amministrazioneService: AmministrazioneService;
    private readonly agenziaService: AgenziaService;
    private readonly imageService: ImageService;

    constructor(authServiceLocal: AuthServiceLocal, authServiceGoogle : AuthServiceGoogle, mailService: MailService, utenteService: UtenteService, agenteService: AgenteService, amministrazioneService: AmministrazioneService, agenziaService: AgenziaService, imageService: ImageService) {
        this.tokenService = new TokenService(process.env.JWT_VERIFY_TOKEN_SECRET ?? "", process.env.JWT_VERIFY_EXPIRES_IN ?? "30m");
        
        this.authServiceLocal = authServiceLocal;
        this.authServiceGoogle = authServiceGoogle;

        this.mailService = mailService;
        this.imageService = imageService;

        this.utenteService = utenteService;
        this.agenteService = agenteService;
        this.amministrazioneService = amministrazioneService;
        this.agenziaService = agenziaService;
    }

    public async login(req: Request<{}, {}, LoginBodyInput>, res: Response) {
        try {
            const { email, password } = req.body;
            const {accessToken, refreshToken, ruolo} = await this.authServiceLocal.login(email, password);
            let info: {nome: string, cognome: string, image?: string};
            
            res.status(200).cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: "none", secure: true }).json({accessToken, ruolo});
        } catch (error) {
          res.sendStatus(401);
        }
    }
    
    public async registerCliente(req: Request<{}, {}, RegisterClienteBodyInput>, res: Response) {
        try {
            const {email, password, callback} = req.body;
            const {nome, cognome, username} = req.body;
            const url = (req.file?.path) ? await this.imageService.upload(req.file.path) : undefined;
            const registeredAuth = await this.authServiceLocal.register({email, password, verified: false, ruolo: "CLIENTE", id: 0});
            await this.utenteService.register({id: 0, nome, cognome, image: url, username, AuthId: registeredAuth.id });
            console.log("qui");
            const token = this.tokenService.generateToken({id: registeredAuth.id, ruolo: registeredAuth.ruolo})
            console.log(token);
            await this.mailService.sendVerificationMail(email, token, callback);
            res.sendStatus(201);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    public async registerAgente(req: Request<{}, {}, RegisterAgenteBodyInput>, res: Response){
        try {
            const id = res.locals.id;
            const {email, callback} = req.body;
            const {nome, cognome, biografia} = req.body;

            const registeredAuth = await this.authServiceLocal.register({email, verified: false, ruolo: "AGENTE", id: 0});

            const agenzia = await this.amministrazioneService.getAgenziaFromId(id);
            await this.agenteService.register({id: 0, nome, cognome, biografia, Agenzia: agenzia, AuthId: registeredAuth.id});
            const token = this.tokenService.generateToken({id: registeredAuth.id, ruolo: registeredAuth.ruolo})
            await this.mailService.sendChangePasswordMail(email, token, callback);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    public async registerSupporto(req: Request<{}, {}, RegisterSupportoBodyInput>, res: Response){
        try {
            const id = res.locals.id;
            const {email, callback} = req.body;
            const {nome, cognome} = req.body;

            const agenzia = await this.agenziaService.getAgenziaByAmministrazione(id);
            
            const registeredAuth = await this.authServiceLocal.register({email, verified: false, ruolo: "SUPPORTO", id: 0});
            await this.amministrazioneService.register({id: 0, nome, cognome, Agenzia: agenzia, AuthId: registeredAuth.id, ruolo: "SUPPORTO"});
            const token = this.tokenService.generateToken({id: registeredAuth.id, ruolo: registeredAuth.ruolo})
            await this.mailService.sendChangePasswordMail(email, token, callback);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    public async registerGestore(req: Request<{}, {}, RegisterGestoreBodyInput>, res: Response){
        try {
            const {email, callback} = req.body;
            const {nome, cognome, AgenziaId} = req.body;

            const registeredAuth = await this.authServiceLocal.register({email, verified: false, ruolo: "GESTORE", id: 0});
            
            const agenzia = await this.agenziaService.getFromId(AgenziaId);
            await this.amministrazioneService.register({id: 0, nome, cognome, Agenzia: agenzia, AuthId: registeredAuth.id, ruolo: "GESTORE"});
            const token = this.tokenService.generateToken({id: registeredAuth.id, ruolo: registeredAuth.ruolo})
            await this.mailService.sendChangePasswordMail(email, token, callback);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getInfo(req: Request, res: Response) {
        try {
            const {id, ruolo} = res.locals;
            let info;
            if(ruolo === "CLIENTE") {
                info = await this.utenteService.getUtenteByAuth(id);
            } else if (ruolo === "AGENTE") {
                info = await this.agenteService.getAgenteByAuth(id);
            } else {
                info = await this.amministrazioneService.getAmministratoreByAuth(id);
            }
            res.json({...info, ruolo});
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
    public async refresh(req: Request, res: Response) {
        try {
            const { refreshToken } = req.cookies;
            if(!refreshToken) {
                res.sendStatus(403);
                return;
            }

            const {accessToken, ruolo} = await this.authServiceLocal.refresh(refreshToken);
            res.status(200).json({accessToken, ruolo});
        } catch (error) {
            res.status(403).send(error);
        }
    }

    public async googleAuth(req: Request, res: Response, next: NextFunction){
        try {
            const {code} = req.body;
            const {nome, cognome, email, image} = await this.authServiceGoogle.verifyGoogleToken(code);
            const {refreshToken, accessToken, ruolo, authId} = await this.authServiceLocal.providerLogin(email);
            if(authId){
                const url = image ? await this.imageService.uploadFromUrl(image) : undefined;
                await this.utenteService.register({id: 0, nome, cognome, username: nome+cognome, AuthId: authId, image: url});
            }
            res.status(200).cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: "none", secure: true }).json({accessToken: accessToken, ruolo});
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

            await this.authServiceLocal.verify(token);
            res.sendStatus(200);
        } catch (error) {
            res.status(401).send(error);
        }
    }

    public async resetPassword(req: Request, res: Response) {
        try {
            const {password, token} = req.body;
            console.log(token);
            console.log(password);
            if(!token || typeof token != "string" || !password || typeof password !== "string"){
                res.status(401).send("Token o Password mancanti");
                return;
            }

            await this.authServiceLocal.resetPassword(token, password);
            await this.authServiceLocal.verify(token);
            res.status(200).send("Successo");
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async requestResetPassword(req: Request, res: Response) {
        try {
            const {email, callback} = req.body;

            if(!email || typeof email != "string"){
                res.sendStatus(401);
                return;
            }

            const auth = await this.authServiceLocal.getByEmail(email);

            if(!auth.password && auth.verified){
                res.status(400).json("Effettua il login con Google");
                return;
            }
            const token = this.tokenService.generateToken({id: auth.id, ruolo: auth.ruolo})
            await this.mailService.sendChangePasswordMail(email, token, callback);
            res.sendStatus(200);
        } catch (error) {
            res.status(401).send(error);
        }
    }

    public async logout(req: Request, res: Response): Promise<void>{
        res.clearCookie("refreshToken").status(200).send("Logout");
    }
}