import { Role } from "../models/AuthT";
import jwt from "jsonwebtoken"

export class TokenService<T extends {}> {
    private tokenSecret: string;
    private tokenDuration: string;

    constructor(secret: string, duration: string) {
        this.tokenSecret = secret;
        this.tokenDuration = duration;
    }

    public generateToken(payload: T): string {
        try {
            const refreshToken = jwt.sign(payload, this.tokenSecret, {
                expiresIn: this.tokenDuration,
            });        
            return refreshToken;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async verifyToken(token: string): Promise<T> {
        try {
            if (!token) {
                return Promise.reject("Token Mancante");
            }

            const payload = jwt.verify(token, this.tokenSecret) as T;
            return payload;
        } catch (error) {
            return Promise.reject("Refresh token non valido o scaduto");
        }
    }
}