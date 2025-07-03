import {ProtectedRoutes} from "../protected-routes/ProtectedRoutes";
import {Route} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Admin from "../pages/Admin";
import Cart from "../pages/Cart";
import React from "react";

export function protectedRoute() {
    return [
        <Route element={<ProtectedRoutes allowedRoles={"USER"}/>} key="protected-user">
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="panier" element={<Cart/>}/>

        </Route>,

        <Route element={<ProtectedRoutes allowedRoles={"ADMIN"}/>} key="protected-admin">
            <Route path="admin" element={<Admin/>}></Route>
        </Route>
    ];
}