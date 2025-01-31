import { DAOFactory } from "../daos/factory/DAOFactory";
import { RicercaDAO } from "../daos/interfaces/RicercaDAO";
import { UtenteDAO } from "../daos/interfaces/UtenteDAO";
import { Utente } from "../models/UtenteT";

import jwt from 'jsonwebtoken';
import { GeneratePassword } from "js-generate-password";
import { AuthService } from "./authService";
import { AgenteDAO } from "../daos/interfaces/AgenteDAO";
import { Agente } from "../models/AgenteT";

export class AuthServiceLocal extends AuthService {
    protected utenteDAO: UtenteDAO | undefined;
    protected agenteDAO: AgenteDAO | undefined;
    protected roleDAO;
    constructor() {
        super();
        this.roleDAO = {
            "USER": this.utenteDAO,
            "AGENT": this.agenteDAO,
        }
    }

    public async findAgenteOrUtente(email: string) : Promise<{user: Utente | Agente | undefined, role: "USER" | "AGENT" | undefined }> {
        try {
            const agente = await this.agenteDAO?.findByEmail(email);
            if(agente) {
                return {user: agente, role: "AGENT"};
            }

            const utente = await this.utenteDAO?.findByEmail(email);
            if(utente){
                return {user: utente, role: "USER"};
            }

            return {user: undefined, role: undefined};
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async login(email: string, password: string) : Promise<{accessToken: string, refreshToken: string, utente: Utente, role: "USER" | "AGENT"}> {
        const {user, role} = await this.findAgenteOrUtente(email);
        if(user && user.password && role){
            const samePassword = await super.validatePassword(password, user.password);
            if(!samePassword) {
                return Promise.reject("Wrong Password");
            }

            const refreshToken = this.generateRefreshToken(user);
            const accessToken = this.generateAccessToken(user);
            return {accessToken, refreshToken, utente: user, role};
        }

        return Promise.reject("User not found");
    }

    private verifyVerificationToken(verifyToken: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!verifyToken) {
                return reject(new Error('Verify token mancante.'));
            }
        
            // Verifica il refresh token
            jwt.verify(verifyToken, process.env.JWT_VERIFY_TOKEN_SECRET as string, (err, decoded) => {
                if (err) {
                    return reject(new Error('Verify token non valido o scaduto.'));
                }
        
                resolve(decoded);  // Se il token è valido, restituiamo il payload decodificato
            });
        });
    }

    public async verify(token: string) : Promise<void> {
        try {
            const email = await this.verifyVerificationToken(token);
            return;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async registerAgente(agente: Agente): Promise<void>{
        try {
            let hashedPassword = "";
            hashedPassword = await this.hashPassword(user.password);
            await this.utenteDAO?.create({...user, password: hashedPassword});
        } catch (error) {
            return Promise.reject(error);
        }
    }
}