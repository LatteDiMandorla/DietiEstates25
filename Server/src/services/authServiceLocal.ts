import bcrypt from 'bcrypt';
import { Auth, Role } from "../models/AuthT";
import { TokenService } from "./tokenService";
import { AuthDAO } from "../daos/interfaces/AuthDAO";

export interface RefreshTokenPayload {
    id: number,
    ruolo: Role
}

export interface AccessTokenPayload {
    id: number,
    ruolo: Role
}

export interface VerifyTokenPayload {
    id: number,
    ruolo: Role
}

export class AuthServiceLocal {
    private readonly authDAO: AuthDAO;
    private readonly accessTokenService: TokenService<AccessTokenPayload>;
    private readonly refreshTokenService: TokenService<RefreshTokenPayload>;
    private readonly verifyTokenService: TokenService<VerifyTokenPayload>;

    constructor(authDAO: AuthDAO, refreshTokenService?: TokenService<RefreshTokenPayload>, accessTokenService?: TokenService<AccessTokenPayload>){
        this.authDAO = authDAO;
        this.refreshTokenService = refreshTokenService ?? new TokenService(process.env.JWT_REFRESH_TOKEN_SECRET || "", process.env.JWT_REFRESH_EXPIRES_IN || "");
        this.accessTokenService = accessTokenService ?? new TokenService(process.env.JWT_TOKEN_SECRET || "", process.env.JWT_EXPIRES_IN || "");
        this.verifyTokenService = new TokenService(process.env.JWT_VERIFY_TOKEN_SECRET || "", process.env.JWT_VERIFY_EXPIRES_IN || "");
    }

    private async hashPassword(plainTextPassword: string) : Promise<string> {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(plainTextPassword, saltRounds);
        return hashed;
    };
            
    private async validatePassword(candidatePassword: string, storedPassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, storedPassword);
    };

    public async refresh(refreshToken: string) : Promise<{accessToken: string, ruolo: Role}> {
        try {
            const {id, ruolo} = await this.refreshTokenService.verifyToken(refreshToken);
            const accessToken = this.accessTokenService.generateToken({id, ruolo});
            return {accessToken, ruolo};
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async register(auth: Auth) : Promise<Auth> {
        try {
            let hashedPassword = "";
            if(auth.password){
                hashedPassword = await this.hashPassword(auth.password);
            }
            const authId = await this.authDAO.create({...auth, password: hashedPassword});
            return {...auth, id: authId};
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string, ruolo: string }> {
        try {
            if(email == "" || password == "") {
                return Promise.reject("Missing Email or Password");
            }

            const auth = await this.authDAO.findByEmail(email);
            if(!auth){
                return Promise.reject("User not found");
            }
            
            const samePassword = await this.validatePassword(password, auth.password || "");
            if(!samePassword) {
                return Promise.reject("Wrong Password")
            }

            const accessToken = this.accessTokenService.generateToken({id: auth.id, ruolo: auth.ruolo});
            const refreshToken = this.refreshTokenService.generateToken({id: auth.id, ruolo: auth.ruolo});
            return {accessToken, refreshToken, ruolo: auth.ruolo};
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async providerLogin(email: string) : Promise<{ accessToken: string, refreshToken: string, ruolo: string, authId?: number }> {
        try {
            const auth = await this.authDAO.findByEmail(email);
            let authId;
            if(!auth){
                authId = await this.authDAO.create({id: 0, email, ruolo: "CLIENTE", verified: true});
            } else {
                authId = auth.id;
            }

            const accessToken = this.accessTokenService.generateToken({id: authId, ruolo: "CLIENTE"});
            const refreshToken = this.refreshTokenService.generateToken({id: authId, ruolo: "CLIENTE"});
            return {accessToken, refreshToken, ruolo: "CLIENTE", authId: auth ? undefined : authId};
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async getByEmail(email: string) : Promise<Auth> {
        try {
            const auth = await this.authDAO.findByEmail(email);
            if(!auth){
                return Promise.reject("Non trovato");
            }

            return auth;
        } catch (error) {
            return Promise.reject(error);
        }
    }


    public async verify(token: string): Promise<void> {
        try {
            const {id, ruolo} = await this.verifyTokenService.verifyToken(token);
            await this.authDAO.verify(id);
            return;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async resetPassword(token: string, newPassowrd: string): Promise<void> {
        const { id, ruolo } = await this.verifyTokenService.verifyToken(token);
        if (!id || !ruolo) {
            return Promise.reject("Token non valido");
        }

        const user = await this.authDAO.findById(id);
        if(!user || !(user.password || user.verified)){
            return Promise.reject("Cambio password non possibile");
        }

        const hashedPassword = await this.hashPassword(newPassowrd);
        await this.authDAO.update(id, hashedPassword);
    }

    public async getInfo(id: number, role: Role) {
        return await this.authDAO.findInfoByRole(id, role);
    }
}