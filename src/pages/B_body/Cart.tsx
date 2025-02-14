import {FC} from 'react';
import '../../App.css';
import ProductCartLayout from "../../components/ProductCartLayout";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart: FC<{}> = ({}) => {

    return (
        <>

            <section className="cart">
                <div style={{width: "200px", display : "flex", justifyContent: "space-between", alignItems: "center", cursor:"pointer"}}>
                    <h1 className="cartTitle">Panier</h1>
                    <DeleteIcon/>
                </div>

                <div className="cartLayout">
                    <div className="detailCart">
                       <ProductCartLayout/>
                       <ProductCartLayout/>
                    </div>

                    <div className="totalCart">
                        <h2 style={{fontSize: "25px"}}>Total</h2>
                        <p style={{fontWeight: "bold", fontSize: "20px"}}>0.00</p>
                        <div style={{textAlign: "center"}}>
                            <input type="email" placeholder="Entrer l'email pour valider" required
                                   style={{width: "90%", padding: 8, margin: "5px 0"}}/>
                            <button className="submitCart">Valider le paiement</button>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};

export default Cart;
