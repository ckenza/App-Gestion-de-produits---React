import React from 'react';
import './App.css';
import Navbar from "./components/header/Navbar";
import Footer from "./pages/C_footer/Footer";
import Login from "./pages/B_body/Login";
import ProductLayout from "./components/ProductLayout";
import Dashboard from "./pages/B_body/Dashboard";
import ProductDetails from "./pages/B_body/ProductDetails";
import Cart from "./pages/B_body/Cart";

function App() {
  return (
    <>
      <Navbar />

      <Cart/>

    <Footer/>

    </>
  );
}

export default App;
