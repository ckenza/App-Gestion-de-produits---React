import {FC, useContext, useState} from 'react';
import '../App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import {ProductItem as ProductType} from "../@types/app";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {useAddToCartContext} from "../contexts/AddToCartContext";

const ProductCartLayout: FC<{ product: ProductType, /*onDelete: () => void*/ }> = ({product /*, onDelete*/}) => {

    const {removeFromCart, localStock, updateCartQuantity} = useAddToCartContext();
    const [quantity, setQuantity] = useState(product.quantity || 1);
    const availableStock = product ? (localStock.get(product.id) ?? product.stock) : 0;

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            updateCartQuantity(product.id, newQuantity);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateCartQuantity(product.id, newQuantity);
        }
    };

    return (
        <div className="productCartContainer">
            <div className="productCartImage" style={{backgroundImage: `url(${product.image})`}}></div>
            <div style={{display: "flex", flexDirection: "column", marginLeft: "20px"}}>
                <h2 style={{width: "100%", paddingLeft: "5px"}}>{product.title}</h2>
                <div
                    style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 15px"}}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <p style={{fontSize: "18px", marginRight: 2}}>Prix produit : {product.price} €</p>
                        <p style={{fontSize: "18px", marginLeft: "30px", display: "flex", gap: 2}}>
                            <RemoveIcon onClick={decreaseQuantity} sx={{cursor: "pointer"}} />
                            {product.quantity}
                            <AddIcon
                                onClick={quantity < availableStock ? increaseQuantity : undefined}
                                sx={{
                                    cursor: quantity < availableStock ? "pointer" : "not-allowed"
                                }}
                            />
                        </p>
                    </div>
                </div>
            </div>
            <DeleteIcon onClick={() => removeFromCart(product.id)} sx={{margin: "70px auto auto 50px", cursor: "pointer"}}/>
        </div>
    );
};


export default ProductCartLayout;
