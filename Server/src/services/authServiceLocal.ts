import { DAOFactory } from "../daos/factory/DAOFactory";
import { RicercaDAO } from "../daos/interfaces/RicercaDAO";
import { UtenteDAO } from "../daos/interfaces/UtenteDAO";
import { Utente } from "../models/UtenteT";

import jwt from 'jsonwebtoken';
import { AuthService } from "./authService";

export class AuthServiceLocal extends AuthService {
    protected utenteDAO: UtenteDAO | undefined;
    constructor() {
        super();
    }

    public async login(email: string, password: string) : Promise<{accessToken: string, refreshToken: string, utente: Utente}> {
        const user = await this.utenteDAO?.findByEmail(email);
        if(user && user.password){
            const samePassword = await super.validatePassword(password, user.password);
            if(!samePassword) {
                return Promise.reject("Wrong Password");
            }

            const refreshToken = this.generateRefreshToken(user);
            const accessToken = this.generateAccessToken(user);
            return {accessToken, refreshToken, utente: user};
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
}