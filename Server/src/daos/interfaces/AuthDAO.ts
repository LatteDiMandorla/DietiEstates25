import { Auth, Role } from "../../models/AuthT";

export interface AuthDAO {
    create(auth: Auth) : Promise<number>;
    findByEmail(email: string) : Promise<Auth | undefined>;
    update(id: number, newPassword: string) : Promise<void>;
    verify(id: number) : Promise<void>;
    findById(id: number): Promise<Auth | undefined>;
    findInfoByRole(id: number, role: Role): Promise<any>;
    delete(id: number): Promise<void>;
}