import {FC, useContext, useState} from 'react';
import '../App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import {ProductItem as ProductType} from "../@types/product";


const ProductCartLayout: FC<{ product: ProductType, onDelete: () => void }> = ({product, onDelete}) => {

    const [quantity, setQuantity] = useState(product.quantity || 1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    return (
        <div className="productCartContainer">
            <div className="productCartImage"></div>
            <div style={{display: "flex", flexDirection: "column", marginLeft: "20px"}}>
                <h2 style={{width: "100%", paddingLeft: "5px"}}>{product.titleProduct}</h2>
                <div
                    style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 15px"}}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "130px"
                    }}>
                        <p style={{fontSize: "18px", marginRight: 2}}>Prix produit : {product.price} €</p>
                        <p style={{fontSize: "18px", marginLeft: "30px"}}>Quantité : {product.quantity}</p>
                    </div>
                </div>
            </div>
            <DeleteIcon onClick={onDelete} sx={{margin: "70px auto auto 50px", cursor: "pointer"}}/>
        </div>
    );
};


export default ProductCartLayout;
