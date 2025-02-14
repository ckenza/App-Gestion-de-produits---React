import React, {createContext, useState} from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {ProductItem} from "../@types/product";


export const AddToCartContext = createContext<any>(null);


export const AddToCartProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [addToCart, setAddToCart] = useState<ProductItem[]>([]);


    return (
        <AddToCartContext.Provider value={{addToCart, setAddToCart}}>
            {children}
        </AddToCartContext.Provider>
    );

}