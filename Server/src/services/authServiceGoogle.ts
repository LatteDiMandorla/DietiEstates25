import { DAOFactory } from "../daos/factory/DAOFactory";
import { Utente } from "../models/UtenteT";
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { AuthService } from "./authService";

export class AuthServiceGoogle extends AuthService {
    private client : OAuth2Client;
    constructor() {
        super();
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'postmessage');
    }

    public async verifyGoogleToken(idToken: string) : Promise<TokenPayload> {
        try {
            const tokens = await this.client.getToken(idToken);
        const ticket = await this.client.verifyIdToken({idToken: tokens.tokens.id_token || "", audience: process.env.GOOGLE_CLIENT_ID})
            const payload = ticket.getPayload();
            return payload || Promise.reject("Token non valido");

        } catch (error : any) {
            console.log(error)
            return Promise.reject('Errore di verifica del token: ' + error?.message);
        }
    }

    public async login(idToken: string) : Promise<{accessToken: string, refreshToken: string, utente: Utente}> {
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

                const accessToken = this.generateAccessToken({...utente, role: "USER"});
                const refreshToken = this.generateRefreshToken({...utente, role: "USER"});

                return {accessToken, refreshToken, utente};
            }

            return Promise.reject();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}