import {FC} from 'react';
import {useAuth} from "../contexts/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';

const Dashboard: FC<{}> = ({}) => {
    const {logout} = useAuth();

    return (
        <>
            <h1 style={{fontSize: "35px", textAlign: "center"}}>Dashboard</h1>
            <div style={{backgroundColor: "black", height: "3px", width: "220px", margin: "auto"}}></div>

            <div style={{display: "flex", justifyContent: "end", margin: "0 30px"}}>
                <LogoutIcon sx={{fontSize: "35px"}} onClick={logout}/>
            </div>
        </>
    );
};

export default Dashboard;
