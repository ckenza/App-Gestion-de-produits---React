import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LayoutWithBar from "./layout/LayoutWithBar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/auth/Login";
import {AddToCartProvider} from "./contexts/AddToCartContext";
import './App.css';
import Register from "./pages/auth/Register";
import {AuthProvider} from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import {ProtectedRoutes} from "./protected-routes/ProtectedRoutes";
import Admin from "./pages/Admin";
import {protectedRoute} from "./routes/ProtectedRoutes";

function App() {
  return (
    <>
        <BrowserRouter>
            <AuthProvider>
                <AddToCartProvider>
                    <Routes>
                        {protectedRoute()}
                        <Route path="/" element={<LayoutWithBar/>}>
                            <Route index element={<Home/>}/>
                            <Route path="accueil" element={<Home/>}/>
                            <Route path="product/:id" element={<ProductDetails/>}/>
                            <Route path="connexion" element={<Login/>}/>
                            <Route path="inscription" element={<Register/>}/>
                        </Route>
                    </Routes>
                </AddToCartProvider>
            </AuthProvider>
        </BrowserRouter>
    </>
  );
}

export default App;
