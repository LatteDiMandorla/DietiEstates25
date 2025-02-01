import { DAOFactory } from "../daos/factory/DAOFactory";
import { RicercaDAO } from "../daos/interfaces/RicercaDAO";
import { UtenteDAO } from "../daos/interfaces/UtenteDAO";
import { Utente } from "../models/UtenteT";

import jwt from 'jsonwebtoken';
import { AuthService } from "./authService";
import { AgenteDAO } from "../daos/interfaces/AgenteDAO";
import { Agente } from "../models/AgenteT";
import { Role } from "../models/AuthT";
import { Amministrazione } from "../models/AmministrazioneT";
import { AmministrazioneDAO } from "../daos/interfaces/AmministrazioneDAO";

export class AuthServiceLocal extends AuthService {
    constructor() {
        super();
    }

    public async findRole(email: string) : Promise<{user: Utente | Agente | undefined, role: Role | undefined }> {
        try {
            const amministratore = await this.amministrazioneDAO?.findByEmail(email);
            if(amministratore) {
                return {user: amministratore, role: amministratore.ruolo};
            }

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

    private getDAO(role: Role): UtenteDAO | AgenteDAO | AmministrazioneDAO | undefined{
        if(role === "USER"){
            return this.utenteDAO;
        } else if(role === "AGENT") {
            return this.agenteDAO;
        } else if(role === "GESTORE" || role === "SUPPORTO") {
            return this.amministrazioneDAO;
        }
    }

    public async login(email: string, password: string) : Promise<{accessToken: string, refreshToken: string, utente: Utente, role: Role}> {
        const {user, role} = await this.findRole(email);
        if(user && user.password && role){
            const samePassword = await super.validatePassword(password, user.password);
            if(!samePassword) {
                return Promise.reject("Wrong Password");
            }

            const refreshToken = this.generateRefreshToken({...user, role: role});
            const accessToken = this.generateAccessToken({...user, role: role});
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

    public async registerRole(user: Agente | Amministrazione, role: Role): Promise<string>{
        try {
            const password = "ABCDEF12345";
            const hashedPassword = await this.hashPassword(password);
            if(role == "AGENT"){
                await this.agenteDAO?.create({...user, password: hashedPassword});
            } else if (role == "GESTORE" || role == "SUPPORTO"){
                await this.amministrazioneDAO?.create({...user, password: hashedPassword, ruolo: role});
            }
            return hashedPassword;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async resetPassword(token: string, newPassowrd: string): Promise<void>{
        const {email, role} = await this.verifyVerificationToken(token);
        if(!email || !role || typeof role !== "string"){
            return Promise.reject("Token non valido");
        }
        
        const {user, role: storedRole} = await this.findRole(email);
        if(!user || !user.id || role !== storedRole){
            return Promise.reject("Utente non trovato");
        }

        const authDAO = this.getDAO(storedRole);
        const hashedPassword = await this.hashPassword(newPassowrd);
        await authDAO?.updatePassword(user.id, hashedPassword);
    }
}