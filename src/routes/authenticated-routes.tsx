import { useContext } from "react";

import { AuthContext } from "@/providers/auth";

import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AuthenticatedRoutes() {
    const { user } = useContext(AuthContext);

    const location = useLocation();

    return user ? <Outlet /> : <Navigate to='/' state={{ from: location }} />
}