/* import React, {createContext, FC, ReactNode} from "react";
import {Purchase} from "../@types/app";
import Dashboard from "../pages/Dashboard";

interface DashboardContextProps {
    lastPurchases: Purchase[];
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider: FC<{children : React.ReactNode}> = ({children}) => {}
    return(
        <DashboardContext.Provider value={{lastPurchases}}>
            {children}
        </DashboardContext.Provider>
    )
} */

import {FC} from 'react';

const MyComponent: FC<{}> = ({}) => {
    return (
        <div>

        </div>
    );
};

export default MyComponent;


