import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode"; // fix: default import
import isTokenValid from "../helpers/isTokenValid.js";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        id: null,
        user: null,
        email: null,
        cocktail_ids: [],
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

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            if (isTokenValid(token)) {
                setAuth({
                    isAuth: true,
                    id: decodedToken.userId,
                    user: decodedToken.name || decodedToken.email,
                    email: decodedToken.email,
                    cocktail_ids: decodedToken.data?.user_profiles?.cocktail_ids?.map(id => id.trim()) || [],
                    status: "done",
                    token: token
                });
            } else {
                logout();
            }
        } else {
            logout();
        }
    }, []);

    function login(userDetails) {
        const decodedToken = jwtDecode(userDetails.token);
        const authData = {
            isAuth: true,
            id: decodedToken.userId,
            user: userDetails.user.name || userDetails.user.email,
            email: userDetails.user.email,
            cocktail_ids: userDetails.user.cocktail_ids?.map(id => id.trim()) || [],
            status: "done",
            token: userDetails.token
        };

        localStorage.setItem("auth", JSON.stringify(authData));
        setAuth(authData);

        navigate('/profile');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        setAuth({
            isAuth: false,
            id: null,
            user: null,
            email: null,
            cocktail_ids: [],
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
