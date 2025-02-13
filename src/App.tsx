import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LayoutWithBar from "./layout/LayoutWithBar";
import Dashboard from "./pages/B_body/Dashboard";
import ProductDetails from "./pages/B_body/ProductDetails";
import Cart from "./pages/B_body/Cart";
import Login from "./pages/B_body/Login";

function App() {
  return (
    <>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutWithBar/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="Accueil" element={<Dashboard/>}/>
                    <Route path="Détail/:id" element={<ProductDetails/>}/>
                    <Route path="Panier" element={<Cart/>}/>
                    <Route path="Connexion" element={<Login/>}/>
                </Route>
            </Routes>
        </BrowserRouter>

    </>
  );
}

export default App;
