import React, {createContext, FC, useContext, useEffect, useState} from "react";
import {ProductItem} from "../@types/app";

interface AddToCartType {
    cartContent : ProductItem[];
    addToCart : (product: ProductItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    localStock: Map<number, number>;
    updateCartQuantity: (id: number, newQuantity: number) => void;
}

export const AddToCartContext = createContext<AddToCartType | null>(null);

export const AddToCartProvider: FC<{ children: React.ReactNode }> = ({children}) => {
    const [localStock, setLocalStock] = useState<Map<number, number>>(new Map());

    const [cartContent, setCartContent] = useState<ProductItem[]>(() => {
        try {
            const data = JSON.parse(localStorage.getItem("cartContent") || "[]");
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    });


    const addToCart = (product: ProductItem) => {
        setCartContent(prev => {
            const existing = prev.find(p => p.id === product.id);
            if(existing){
                return prev.map(p =>
                p.id === product.id
                    ? {...p,
                        quantity: p.quantity + product.quantity,
                        totalPrice : p.price * (p.quantity + product.quantity),
                } : p
                );
            } else {
                return [...prev, {...product, totalPrice: product.price * product.quantity}];
            }
        });

        setLocalStock(prev => {
            const currentStock = prev.get(product.id) ?? product.stock;
            const newStock = Math.max(currentStock - product.quantity, 0);
            return new Map(prev).set(product.id, newStock);
        });
    };


    const updateCartQuantity = (productId: number, newQuantity: number) => {
        setCartContent(prev => {
            return prev.map(p => {
                if (p.id === productId) {
                    return {
                        ...p,
                        quantity: newQuantity,
                        totalPrice: p.price * newQuantity
                    };
                }
                return p;
            });
        });

        setLocalStock(prev => {
            const product = cartContent.find(p => p.id === productId);
            if (!product) return prev;

            const originalStock = product.stock;
            const newStock = Math.max(originalStock - newQuantity, 0);
            return new Map(prev).set(productId, newStock);
        });
    };


    const removeFromCart = (id: number) => {
        setCartContent(prev => prev.filter(item => item.id !== id));
    };


    const clearCart = () => setCartContent([]);

    useEffect(() => {
        localStorage.setItem("cartContent", JSON.stringify(cartContent));
    }, [cartContent]);


    return (
        <AddToCartContext.Provider value={{cartContent, addToCart, clearCart, removeFromCart, localStock, updateCartQuantity}}>
            {children}
        </AddToCartContext.Provider>
    );

}

// Hook personnalisé
export const useAddToCartContext = () => {
    const context = useContext(AddToCartContext);
    if (!context) {
        throw new Error("useAddToCartContext must be used within the context");
    }
    return context;
}