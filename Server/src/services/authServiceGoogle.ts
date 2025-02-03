import { OAuth2Client } from 'google-auth-library';

interface GoogleTokenPayload {
    nome: string,
    cognome: string,
    email: string,
    image?: string,
}

export class AuthServiceGoogle {
    private client: OAuth2Client;
    constructor() {
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'postmessage');
    }

    public async verifyGoogleToken(idToken: string): Promise<GoogleTokenPayload> {
        try {
            const tokens = await this.client.getToken(idToken);
            const ticket = await this.client.verifyIdToken({ idToken: tokens.tokens.id_token || "", audience: process.env.GOOGLE_CLIENT_ID })
            const payload = ticket.getPayload();
            if(!payload || !payload.email || !payload.given_name || !payload.family_name || !payload.email_verified) {
                return Promise.reject("Informazioni utente mancanti");
            }

            return {nome: payload.given_name, cognome: payload.family_name, email: payload.email, image: payload.picture};

        } catch (error: any) {
            return Promise.reject('Errore di verifica del token: ' + error?.message);
        }
    }
}