import React, {createContext, FC, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode"

interface AuthContext {
    userId: number;
    email: string | null;
    login: (token: string) => void;
    logout: () => void;
    decodeToken: () => void;
    token: string | null;
    userRole: string | null;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({children}) => {
    const [userId, setUserId] = useState<number>(0);
    const [email, setEmail] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [userRole, setUserRole] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            decodeToken();
            const currentTime = Date.now() / 1000;
            const decoded: any = jwtDecode(token);
            const timeUntilExpiry = (decoded.exp - currentTime) * 1000; // convertit en ms
            console.log(decoded)

            setUserRole(decoded.role);

            if(timeUntilExpiry > 0){
                const logoutTimer = setTimeout(() => {
                    logout();
                }, timeUntilExpiry);

                // nettoie le timer si le composant de démonte
                return () => clearTimeout(logoutTimer);
            } else {
                logout();
            }
        }
    }, [token]);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
        decodeToken()
    }

    const logout = () => {
        localStorage.clear()
        setToken(null);
        setUserId(0);
        setEmail(null)

        navigate('/', {replace: true}); // Ne marche pas
    }


    const decodeToken = () => {
        if (token) {
            try { // récupérer l'id de l'utilisateur depuis le token
                const decoded: any = jwtDecode(token);
                console.log("Token décodé :", decoded.id);

                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    logout()
                } else {
                    setUserId(decoded.id);
                    setEmail(decoded.sub);
                }

            } catch (error) {
                console.error("Error decoding token:", error);
                logout()
            }
        }
    }

    return (
        <AuthContext.Provider value={{userId, email, login, logout, decodeToken, token, userRole}}>
            {children}
        </AuthContext.Provider>
    )
}

// hook personnalisé
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext is undefined")
    }

    return context;
}