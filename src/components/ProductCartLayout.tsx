import {FC, useState} from 'react';
import '../App.css';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCartLayout: FC<{}> = ({}) => {


    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    return (

        <div className="productCartContainer">

            <div className="productCartImage">
            </div>

            <div style={{display: "flex", flexDirection: "column", marginLeft: "20px"}}>
                <h2 style={{width: "100%", paddingLeft: "5px"}}>Titre du produit</h2>
                <div
                    style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 15px"}}>
                    <div style={{display:"flex", justifyContent: "space-between", alignItems:"center", width: "130px"}}>
                        <p style={{fontSize: "18px"}}>Total produit : </p>
                    </div>
                </div>
            </div>

            <DeleteIcon sx={{margin: "70px auto auto 50px", cursor: "pointer"}}/>

        </div>

    );
};

export default ProductCartLayout;
