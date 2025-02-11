import {FC} from 'react';
import '../App.css';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const ProductLayout: FC<{}> = ({}) => {
    return (

        <div className="productContainer">

            <div className="productImage">
            </div>

            <div style={{display: "flex", flexDirection: "column"}}>
                <h2 style={{width: "100%", paddingLeft: "5px"}}>Titre du produit</h2>
                <div style={{display: "flex", justifyContent:"space-between", alignItems: "center", padding: "0 15px"}}>
                    <p style={{fontSize: "18px"}}>Prix</p>
                    <ShoppingBagIcon sx={{fontSize:"28px"}}/>
                </div>
            </div>

        </div>

    );
};

export default ProductLayout;
