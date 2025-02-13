import {FC} from 'react';
import {Outlet} from "react-router";
import Navbar from "../components/header/Navbar";
import Footer from "../pages/C_footer/Footer";

const LayoutWithBar: FC<{}> = ({}) => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default LayoutWithBar;
