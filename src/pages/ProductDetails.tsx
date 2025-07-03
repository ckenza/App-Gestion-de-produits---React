import {FC, useEffect, useState} from 'react';
import {useAddToCartContext} from "../contexts/AddToCartContext";
import {ProductItem} from "../@types/app";
import "../App.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {get, put} from "../API/api";
import {useParams} from "react-router-dom";

const ProductDetails: FC<{}> = ({}) => {
    const [product, setProduct] = useState<ProductItem | null>(null);
    const [quantity, setQuantity] = useState(1);
    const {addToCart, localStock} = useAddToCartContext();
    const {id} = useParams<{ id: string }>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const availableStock = product ? (localStock.get(product.id) ?? product.stock) : 0;


    const handleCart = async () => {
        if (!product) return;

        const newStock = product.stock - quantity;
        if(newStock < 0){
            setErrorMessage("Stock épuisé")
            return;
        }

        try {
            const updatedProduct = {
                ...product,
                stock: newStock
            };
            setQuantity(1);
            setErrorMessage(null);

            addToCart({
                ...updatedProduct,
                quantity,
                totalPrice: product.price * quantity
            });
        } catch (e) {
            console.error("Erreur lors de la mise à jour du stock :", e);
        }
    };

    useEffect(() => {
        if (!id) return;

        const fetchProductDetails = async () => {
            try {
                const response = await get(`/product/${id}`);
                console.log("Détails produit reçus :", response);

                if (response) {
                    setProduct(response as ProductItem);
                } else {
                    console.warn("Produit non trouvé");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du produit :", error);
            }
        }

        fetchProductDetails();
    }, []);

    const increaseQuantity = () => {
        if (product) {
            if (quantity < availableStock) {
                setQuantity(quantity + 1);
                setErrorMessage(null);
            } else {
                setErrorMessage("quantité max. disponible");
            }
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setErrorMessage(null);
        }
    };

    return (
        <section className="productDetails">
            <div className="imageProduct" style={{backgroundImage: `url(${product?.image})`}}></div>
            <div className="details">
                <h2 className="productTitle">{product?.title}</h2>
                <p style={{margin: "20px 0"}}>Prix: {product?.price} €</p>

                {availableStock > 0 ? (
                    <>
                        <div className="addToCart">
                            <div style={{display: "flex", width: "100px", justifyContent: "space-between"}}>
                                <RemoveIcon onClick={decreaseQuantity} sx={{cursor: "pointer"}}/>
                                <span style={{fontSize: "18px"}}>{quantity}</span>
                                <AddIcon onClick={increaseQuantity} sx={{cursor: "pointer"}}/>
                            </div>
                            <button className="btnAddToCart" onClick={handleCart}>
                                Ajouter au panier
                            </button>
                        </div>
                    </>
                ) : (
                    <p style={{margin: "50px", color: "red"}}>Stock épuisé</p>
                )}
                {errorMessage && (
                    <p style={{color: "red", margin: "10px 0", fontSize: "12px"}}>{errorMessage}</p>
                )}

                <div style={{marginTop: 60}}>
                    <div className="detailContainer">
                        <div className="detailHeader"
                             onClick={(e) => {
                                const content = e.currentTarget.nextElementSibling;
                                if (content) {
                                    content.classList.toggle("open");
                                }
                            }}
                        >
                            <span className="detailTitle">Description</span>
                            <span className="detailIcon"><AddIcon/></span>
                        </div>
                        <div className="detailContent">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>


                    <div className="detailContainer">
                        <div className="detailHeader" onClick={(e) => {
                            const content = e.currentTarget.nextElementSibling;
                            if (content) {
                                content.classList.toggle("open");
                            }
                        }}>

                            <span className="detailTitle">Ingrédients</span>
                            <span className="detailIcon"><AddIcon /></span>
                        </div>
                        <div className="detailContent">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
