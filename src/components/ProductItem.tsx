import {FC} from 'react';
import '../App.css';
import {ProductItem as ProductType} from "../@types/app";
import {useNavigate} from "react-router-dom";

interface ProductItemProps {
    product: ProductType
}

const ProductItem: FC<ProductItemProps> = ({product}) => {

    const navigate = useNavigate();

    return (

        <div className="productContainer"
             onClick={() => navigate(`/product/${product.id}`)}
        >
            <div className="productImage">
                <img src={product.image} alt={product.title} style={{width: "100%", height: "auto"}}/>
            </div>

            <div style={{display: "flex", flexDirection: "column"}}>
                <h2 style={{width: "100%", paddingLeft: "5px"}}>{product.title}</h2>
                <div
                    style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 15px"}}>
                    <p style={{fontSize: "18px"}}>{product.price}</p>
                    <p style={{textDecoration: "underline"}}>Détails</p>
                </div>
            </div>
        </div>

    );
}


export default ProductItem;
