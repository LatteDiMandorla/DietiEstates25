import { DAOFactory } from "../daos/factory/DAOFactory";
import { RicercaDAO } from "../daos/interfaces/RicercaDAO";
import { UtenteDAO } from "../daos/interfaces/UtenteDAO";
import { Utente } from "../models/UtenteT";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AgenteDAO } from "../daos/interfaces/AgenteDAO";
import { AmministrazioneDAO } from "../daos/interfaces/AmministrazioneDAO";

export abstract class AuthService {
    protected utenteDAO: UtenteDAO | undefined;
    protected agenteDAO: AgenteDAO | undefined;
    protected amministrazioneDAO: AmministrazioneDAO | undefined;
    constructor() {
        const factory = new DAOFactory();
        this.utenteDAO = factory.getUtenteDAO(process.env.DAOTYPE || "");
        this.agenteDAO = factory.getAgenteDAO(process.env.DAOTYPE || "");
        this.amministrazioneDAO = factory.getAmministrazioneDAO(process.env.DAOTYPE || "");
        
    }

    protected async hashPassword(plainTextPassword: string) : Promise<string> {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(plainTextPassword, saltRounds);
        return hashed;
    };
            
    protected async validatePassword(candidatePassword: string, storedPassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, storedPassword);
    };

    protected generateRefreshToken(user: any) : string {
        const payload = {id: user.id, role: user.role};
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET || "1234", {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
        });

        return refreshToken;
    }

    protected generateAccessToken(user: any) : string {
        const payload = {id: user.id, role: user.role};
        const refreshToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET || "4321", {
            expiresIn: process.env.JWT_EXPIRES_IN || "15m",
        });

        return refreshToken;
    }

    protected verifyRefreshToken(refreshToken: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!refreshToken) {
                return reject(new Error('Refresh token mancante.'));
            }
        
            // Verifica il refresh token
            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET as string, (err, decoded) => {
                if (err) {
                return reject(new Error('Refresh token non valido o scaduto.'));
                }
        
                resolve(decoded);  // Se il token è valido, restituiamo il payload decodificato
            });
        });
    }

    public async refresh(refreshToken: string) : Promise<string> {
        try {
            const user = await this.verifyRefreshToken(refreshToken);
            const accessToken = this.generateAccessToken(user);
            return accessToken;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async register(user: Utente) : Promise<void> {
        try {
            let hashedPassword = "";
            if(user.password){
                hashedPassword = await this.hashPassword(user.password);
            }
            await this.utenteDAO?.create({...user, password: hashedPassword});
        } catch (error) {
            return Promise.reject(error);
        }
    }
}