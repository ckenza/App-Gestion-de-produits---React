import {FC} from 'react';
import {Outlet} from "react-router";
import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer";

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
