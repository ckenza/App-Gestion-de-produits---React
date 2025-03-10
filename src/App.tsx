import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LayoutWithBar from "./layout/LayoutWithBar";
import Dashboard from "./pages/B_body/Dashboard";
import ProductDetails from "./pages/B_body/ProductDetails";
import Cart from "./pages/B_body/Cart";
import Login from "./pages/B_body/Login";
import {AddToCartProvider} from "./contexts/AddToCartContext";

function App() {
  return (
    <>

        <BrowserRouter>
            <AddToCartProvider>
                <Routes>
                    <Route path="/" element={<LayoutWithBar/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="Accueil" element={<Dashboard/>}/>
                        <Route path="ProductDetails/:idProduct" element={<ProductDetails/>} />
                        <Route path="Panier" element={<Cart/>}/>
                        <Route path="Connexion" element={<Login/>}/>
                    </Route>
                </Routes>
            </AddToCartProvider>
        </BrowserRouter>

    </>
  );
}

export default App;
