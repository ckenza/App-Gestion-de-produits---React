import {FC, useState} from 'react';
import {useAddToCartContext} from "../contexts/AddToCartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import {ProductItem} from "../@types/app";
import ProductCartLayout from "../components/ProductCartLayout";
import {post, put} from "../API/api";
import {useAuth} from "../contexts/AuthContext";

const Cart: FC<{}> = ({}) => {
    const {cartContent, clearCart} = useAddToCartContext();
    const totalPrice = cartContent.reduce((sum, product) => sum + product.totalPrice, 0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {userId} = useAuth();

    const handleValidate = async () => {
        setLoading(true);
        setError(null);

        try {
            const invoiceData = {
                idUser: userId,
                date: new Date().toISOString(),
                total: totalPrice
            };

            const response = await post('/invoice', invoiceData);
            const idInvoice = response;

            const items = []
            for (const product of cartContent) {
                items.push({
                    idInvoice,
                    idProduct: product.id,
                    quantity: product.quantity,
                    unit_price: product.price,
                });
            };
            await post(`/invoice_item/${idInvoice}`, items);

            const detail = [];
            for (const product of cartContent) {
                detail.push({
                    idProduct : product.id,
                    quantity : product.quantity
                })
                await post(`/stock/decrease`, detail);
            }

            clearCart();
            alert("Commande validée avec succès !");
        } catch (e: any) {
            setError(e.message || "Erreur lors de la validation");
        } finally {
            setLoading(false);
        }
    }

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
                <DeleteIcon onClick={clearCart} sx={{cursor: "pointer"}}/>
            </div>

            <div className="cartLayout">
                <div className="detailCart">
                    {cartContent.length > 0 ? (
                        cartContent.map((product: ProductItem) => (
                            <ProductCartLayout
                                key={product.id}
                                product={product}
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
                        <button
                            className="submitCart"
                            onClick={handleValidate}
                            style={{cursor: cartContent.length > 0 ? "pointer" : "not-allowed"}}
                            disabled={loading || cartContent.length === 0}
                        >
                            {loading ? "Validation en cours..." : "Valider le paiement"}
                        </button>
                        {error && <p style={{color: "red"}}>{error}</p>}
                    </div>
                </div>

            </div>

        </section>
    );
};

export default Cart;
