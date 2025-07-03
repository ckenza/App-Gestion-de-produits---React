import {FC} from 'react';
import LogoutIcon from "@mui/icons-material/Logout";
import {useAuth} from "../contexts/AuthContext";

const Admin: FC<{}> = ({}) => {
    const {logout} = useAuth();

    return (
        <>
            <h1 style={{fontSize: "35px", textAlign: "center"}}>Bonjour Admin</h1>
            <div style={{backgroundColor: "black", height: "3px", width: "250px", margin: "auto"}}></div>

            <LogoutIcon sx={{fontSize: "35px", position: "absolute", top: 40, right: 40}} onClick={logout}/>
        </>
    );
};

export default Admin;
