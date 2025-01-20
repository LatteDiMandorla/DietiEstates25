import React, { createContext, PropsWithChildren, useState } from "react";
import { Utente } from "../Interfaces/interfaces";

const AuthContext = createContext<{auth: Utente | undefined, setAuth: React.Dispatch<React.SetStateAction<Utente | undefined>>}>({auth: undefined, setAuth: () => {}});

export const AuthProvider = ({ children } : PropsWithChildren) => {
    const [auth, setAuth] = useState<Utente>();

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;