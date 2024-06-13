import { type ReactNode, type Dispatch, type SetStateAction, createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getCustomerLoggedIn } from "@/services/customers/get-customer-logged-in";

type Scheduling = {
    _id: string
    insuranceBrokerName: string
    insuranceBrokerId: string
    date: Date,
    time: string,
    duration: string
    createdAt: Date
}

type User = {
    _id: string,
    name: string
    email: string
    role: "InsuranceBroker" | 'Customer'
    schedulings: Scheduling[]
    createdAt: Date
    updatedAt: Date
}

type AuthProviderData = {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthProviderData>(
    {} as AuthProviderData
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function autoLogin() {
            const token = localStorage.getItem('@reserva-bp:token')
            if (token) {
                try {
                    const userLogged = await getCustomerLoggedIn(token)
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
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;