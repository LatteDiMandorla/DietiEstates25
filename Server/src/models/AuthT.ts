export interface Auth {
    id: number,
    email?: string,
    password?: string,
}

export type Role = "USER" | "AGENT" | "GESTORE" | "SUPPORTO";