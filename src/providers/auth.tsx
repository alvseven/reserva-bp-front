import { type ReactNode, createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getUserLoggedIn } from "@/services/get-user-logged-in";

type User = {
    id: string,
    username: string
    email: string
    role: "InsuranceBroker" | 'Customer'
    createdAt: Date
    updatedAt: Date
}

type AuthProviderData = {
    user: User | null
}

export const AuthContext = createContext<AuthProviderData>(
    {} as AuthProviderData
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function autoLogin() {
            const token = localStorage.getItem("@reserva-bp:token");
            if (token) {
                try {
                    const userLogged = await getUserLoggedIn(token)
                    setUser(userLogged);
                    navigate("/dashboard", { replace: true });
                } catch (error) {
                    console.error('Auto login failed, error: ', error);
                }
            }
        }
        autoLogin();
    }, [navigate]);

    return (
        <AuthContext.Provider
            value={{
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;