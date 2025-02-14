import {FC, useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {Add} from "@mui/icons-material";
import {get} from "../../API/api";
import {AddToCartContext} from "../../contexts/AddToCartContext";

interface ProductItem {
    idProduct: number;
    titleProduct: string;
    imageUrl: string;
    price: number;
    stock: number;
}

const ProductDetails: FC = () => {


    const {idProduct} = useParams<{ idProduct: string }>();
    const [product, setProduct] = useState<ProductItem | null>(null);

    {/* Gère incrémentation/décrémentation quantité */}
    const [quantity, setQuantity] = useState(1);


    {/* Utilisation context ajout au panier */}
    const {addToCart, setAddToCart} = useContext(AddToCartContext);
    const isAdded = addToCart.some((seen: any) => seen.id === product?.idProduct);


    const addClick = (product: ProductItem) => {
        if (product.stock > 0) {
            const isAdded = addToCart.some((added: ProductItem) => added.idProduct === product.idProduct);

            if (!isAdded) {
                setAddToCart([...addToCart, product]); // Ajouter au panier
            }

            // Diminuer le stock localement
            setProduct(prevProduct =>
                prevProduct ? {...prevProduct, stock: prevProduct.stock - 1} : prevProduct
            );
        }
    };


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await get(`/product/${idProduct}`);
                console.log("Détails produit reçus :", response);

                if (response) {
                    setProduct(response);
                } else {
                    console.warn("Produit non trouvé");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du produit :", error);
            }
        };

        fetchProductDetails();
    }, []);



    const increaseQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    if (!product) {
        return <div>Chargement...</div>;
    }

    return (
        <section className="productDetails">
            <div className="imageProduct" style={{backgroundImage: `url(${product.imageUrl})`}}></div>

            <div className="details">
                <h2 className="productTitle">{product.titleProduct}</h2>
                <p style={{margin: "20px 0"}}>Prix: {product.price} €</p>

                {product.stock > 0 ? (
                    <div className="addToCart">
                        <div style={{display: "flex", width: "100px", justifyContent: "space-between"}}>
                            <RemoveIcon onClick={decreaseQuantity} sx={{cursor: "pointer"}}/>
                            <span style={{fontSize: "18px"}}>{quantity}</span>
                            <AddIcon onClick={increaseQuantity} sx={{cursor: "pointer"}}/>
                        </div>
                        {product.stock > 0 ? (
                            <button className="btnAddToCart" onClick={() => addClick(product)}>
                                Ajouter au panier
                            </button>
                        ) : (
                            <span style={{color: "red", fontWeight: "bold", marginLeft: "10px"}}>
                                    Stock épuisé
                                </span>
                        )}
                    </div>
                ) : (
                    <p style={{margin:"50px", color: "red"}}>Stock épuisé</p>
                )}

                <div style={{marginTop: 60}}>
                    <div className="detailContainer">
                        <div className="detailHeader" onClick={(e) => {
                            const content = e.currentTarget.nextElementSibling;
                            if (content) {
                                content.classList.toggle("open");
                            }
                        }}>

                            <span className="detailTitle">Description</span>
                            <span className="detailIcon"><Add/></span>
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
                            <span className="detailIcon"><Add/></span>
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
)
    ;
};

export default ProductDetails;
