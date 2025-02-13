import {FC} from 'react';
import {Outlet} from "react-router";

const LayoutWithoutBar: FC<{}> = ({}) => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export default LayoutWithoutBar;
