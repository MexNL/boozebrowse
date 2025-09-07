import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid.js";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        email: null,
        status: "pending",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
            const parsedAuth = JSON.parse(savedAuth);
            setAuth(parsedAuth);
            return;
        }

        const token = localStorage.getItem('token')
        if (token) {
            const decodedToken = jwtDecode(token);
            if (isTokenValid(token)) {
                setAuth({
                    isAuth: true,
                    user: decodedToken.name,
                    email: decodedToken.email,
                    status: "done",
                });
            } else {
                logout();
            }
        } else {
            logout();
        }
    }, []);

    function login(userDetails) {
        const authData = {
            isAuth: true,
            user: userDetails.user.name,
            email: userDetails.user.email,
            status: "done",
            token: userDetails.token
        };

        localStorage.setItem("auth", JSON.stringify(authData));

        setAuth(authData);

        navigate('/ProfilePage');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.removeItem('auth');
        localStorage.removeItem('token')
        setAuth({
            isAuth: false,
            user: null,
            email: null,
            status: "done",
        });
        navigate('/');
    }

    const contextData = {
        isAuth: auth.isAuth,
        login: login,
        logout: logout,
        ...auth,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
