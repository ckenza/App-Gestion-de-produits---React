import {useAuth} from "../contexts/AuthContext";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer";


export const ProtectedRoutes = ({allowedRoles} : {allowedRoles : string}) => {
    const {token, userRole} = useAuth()
    const location = useLocation();

    if (!token) return <Navigate to="connexion" replace/>;

    // Vérifier si l'utilisateur a le bon rôle
    if (userRole && !allowedRoles.includes(userRole)) {
        // Rediriger vers la page appropriée selon le rôle
        if (userRole === 'ADMIN') {
            return <Navigate to="/admin" replace/>;
        } else if (userRole === 'USER') {
            return <Navigate to="/dashboard" replace/>;
        }
        return <Navigate to="/connexion" replace/>;
    }

    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    );

}