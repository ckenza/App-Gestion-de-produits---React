import {FC} from 'react';
import '../App.css';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {ProductItem as ProductType} from "../@types/product";
import {useNavigate} from "react-router-dom";

interface ProductItemProps {
    product: Partial<ProductType>
}

const ProductLayout: FC<ProductItemProps> = ({product}) => {

    const navigate = useNavigate();

    console.log("Produit reçu :", product);


    return (

        <div className="productContainer"
             onClick={() => navigate(`/ProductDetails/${product.idProduct}`)}>

            <div className="productImage">
                <img src={product.imageUrl} alt={product.titleProduct} style={{width: "100%", height: "auto"}}/>
            </div>


            <div style={{display: "flex", flexDirection: "column"}}>
                <h2 style={{width: "100%", paddingLeft: "5px"}}>{product.titleProduct}</h2>
                <div style={{display: "flex", justifyContent:"space-between", alignItems: "center", padding: "0 15px"}}>
                    <p style={{fontSize: "18px"}}>{product.price}</p>
                    <p>Détails</p>
                </div>
            </div>

        </div>

    );
};

export default ProductLayout;
