import { DAOFactory } from "../daos/factory/DAOFactory";
import { Utente } from "../models/UtenteT";
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { AuthService } from "./authService";

export class AuthServiceGoogle extends AuthService {
    private client : OAuth2Client;
    constructor() {
        super();
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    public async verifyGoogleToken(idToken: string) : Promise<TokenPayload> {
        try {
            const ticket = await this.client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID,})
            const payload = ticket.getPayload();
            return payload || Promise.reject("Token non valido");

        } catch (error : any) {
            return Promise.reject('Errore di verifica del token: ' + error?.message);
        }
    }

    public async login(idToken: string) : Promise<{accessToken: string, refreshToken: string}> {
        try {
            const {given_name, family_name, email, picture}: TokenPayload = await this.verifyGoogleToken(idToken);
            if(given_name && family_name && email && picture) {
                const user = await this.utenteDAO?.findByEmail(email);
                let utente : Utente;
                if(!user) {
                    utente = {nome: given_name, cognome: family_name, email, image: picture};
                    await this.register(utente);
                } else {
                    utente = user;
                }

                const accessToken = this.generateAccessToken(utente);
                const refreshToken = this.generateRefreshToken(utente);

                return {accessToken, refreshToken};
            }

            return Promise.reject();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}