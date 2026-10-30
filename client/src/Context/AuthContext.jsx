
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("collegePortalUser");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Save user after login
    function login(userData) {
        setUser(userData);
        localStorage.setItem(
            "collegePortalUser",
            JSON.stringify(userData)
        );
    }

    // Clear user after logout
    function logout() {
        setUser(null);
        localStorage.removeItem("collegePortalUser");
    }

    const isLoggedIn = Boolean(user);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isLoggedIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
