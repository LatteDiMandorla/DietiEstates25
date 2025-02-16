import jwt from "jsonwebtoken"

export class TokenService<T extends {}> {
    private readonly tokenSecret: string;
    private readonly tokenDuration: string;

    constructor(secret: string, duration: string) {
        this.tokenSecret = secret;
        this.tokenDuration = duration;
    }

    public generateToken(payload: T): string {
            const refreshToken = jwt.sign(payload, this.tokenSecret, {
                expiresIn: this.tokenDuration,
            });        
            return refreshToken;
    }

    public async verifyToken(token: string): Promise<T> {
        try {
            if (!token) {
                return Promise.reject(new Error("Token Mancante"));
            }

            const payload = jwt.verify(token, this.tokenSecret) as T;
            return payload;
        } catch (error) {
            return Promise.reject(new Error("Refresh token non valido o scaduto"));
        }
    }
}