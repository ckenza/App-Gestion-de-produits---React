import {FC} from 'react';
import Navbar from "../../components/header/Navbar";
import LoginForm from "../../components/auth/LoginForm";
import Footer from "../C_footer/Footer";

const Login: FC<{}> = ({}) => {
    return (
        <>

            <Navbar/>
            <LoginForm/>
            <Footer/>

        </>
    );
};

export default Login;
