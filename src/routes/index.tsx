import { Routes, Route } from "react-router-dom";

import { DashboardPage } from "@/pages/dashboard";
import { SignInPage } from "@/pages/sign-in";
import { SignUpPage } from "@/pages/sign-up";
import { AuthenticatedRoutes } from "./authenticated-routes";
import { NotFoundPage } from "@/pages/not-found";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route element={<AuthenticatedRoutes />}>
                <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
        </Routes>
    );
}
