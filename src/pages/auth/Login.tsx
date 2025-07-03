import {FC, useEffect} from 'react';
import LoginForm from "../../components/auth/LoginForm";

const Login: FC<{}> = ({}) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <>
            <LoginForm/>
        </>
    );
};

export default Login;
