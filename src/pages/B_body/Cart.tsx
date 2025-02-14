import {FC, useContext, useMemo} from 'react';
import '../../App.css';
import DeleteIcon from "@mui/icons-material/Delete";
import ProductCartLayout from "../../components/ProductCartLayout";
import {AddToCartContext} from "../../contexts/AddToCartContext";
import {ProductItem} from "../../@types/product";

const Cart: FC<{}> = ({}) => {
    const {addToCart, setAddToCart} = useContext(AddToCartContext);

    // Calcul du total
    const totalPrice = useMemo(() => {
        return addToCart.reduce((acc: number, product: ProductItem) => acc + (product.price * product.quantity), 0);
    }, [addToCart]);

    // Fonction pour supprimer un produit du panier
    const removeFromCart = (idProduct: number) => {
        setAddToCart(addToCart.filter((product: ProductItem) => product.idProduct !== idProduct));
    };

    return (
        <section className="cart">
            <div style={{
                width: "200px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
            }}>
                <h1 className="cartTitle">Panier</h1>
                <DeleteIcon onClick={() => setAddToCart([])} sx={{cursor: "pointer"}}/>
            </div>

            <div className="cartLayout">
                <div className="detailCart">
                    {addToCart && addToCart.length > 0 ? (
                        addToCart.map((product: ProductItem) => (
                            <ProductCartLayout
                                key={product.idProduct}
                                product={product}
                                onDelete={() => removeFromCart(product.idProduct)}  // Passer la fonction de suppression ici
                            />
                        ))
                    ) : (
                        <p>Panier vide</p>
                    )}
                </div>

                <div className="totalCart">
                    <h2 style={{fontSize: "25px"}}>Total</h2>
                    <p style={{fontWeight: "bold", fontSize: "20px"}}>{totalPrice.toFixed(2)} €</p>
                    <div style={{textAlign: "center"}}>
                        <input type="email" placeholder="Entrer l'email pour valider" required
                               style={{width: "90%", padding: 8, margin: "5px 0"}}/>
                        <button className="submitCart">Valider le paiement</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
