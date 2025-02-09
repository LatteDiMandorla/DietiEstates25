import { AccessTokenPayload, AuthServiceLocal, RefreshTokenPayload } from "../src/services/authServiceLocal";
import { AuthDAO } from '../src/daos/interfaces/AuthDAO';
import { TokenService } from "../src/services/tokenService";

// Mock delle dipendenze
const mockAuthDAO = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    verify: jest.fn(),
    findById: jest.fn(),
    findInfoByRole: jest.fn(),
    delete: jest.fn(),
};

const accessTokenService = new TokenService<AccessTokenPayload>('secret', '10m');
const refreshTokenService = new TokenService<RefreshTokenPayload>('secret', '10m');

jest.spyOn(accessTokenService, "generateToken").mockReturnValue("accessToken");
jest.spyOn(refreshTokenService, "generateToken").mockReturnValue("refreshToken");

const authService = new AuthServiceLocal(mockAuthDAO, refreshTokenService, accessTokenService);

describe("AuthService.login", () => {

    test("All Valid", async () => {
        mockAuthDAO.findByEmail.mockResolvedValue({
            id: 1,
            email: "user@example.com",
            password: "hashedPassword",
            ruolo: "CLIENTE"
        });
        
        jest.spyOn(authService as any, "validatePassword").mockReturnValue(true);

        const result = await authService.login("user@example.com", "password123");

        expect(result).toEqual({
            accessToken: "accessToken",
            refreshToken: "refreshToken",
            ruolo: "CLIENTE"
        });
    });

    test("Email mancante", async () => {
        await expect(authService.login("", "password123")).rejects.toEqual("Missing Email or Password");
    });

    test("Password mancante", async () => {
        await expect(authService.login("user@example.com", "")).rejects.toEqual("Missing Email or Password");
    });

    test("Utente non trovato", async () => {
        mockAuthDAO.findByEmail.mockResolvedValue(undefined);

        await expect(authService.login("notfound@example.com", "password123")).rejects.toEqual("User not found");
    });

    test("Password errata", async () => {
        mockAuthDAO.findByEmail.mockResolvedValue({
            id: 1,
            email: "user@example.com",
            password: "hashedPassword",
            ruolo: "user"
        });

        jest.spyOn(authService as any, "validatePassword").mockReturnValue(false);
        await expect(authService.login("user@example.com", "wrongpassword")).rejects.toEqual("Wrong Password");
    });

});
