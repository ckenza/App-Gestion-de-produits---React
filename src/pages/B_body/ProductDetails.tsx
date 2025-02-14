import {FC, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {Add} from "@mui/icons-material";
import {get} from "../../API/api";

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
    const [quantity, setQuantity] = useState(1);





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

                <div className="addToCart">
                    <div style={{display: "flex", width: "100px", justifyContent: "space-between"}}>
                        <RemoveIcon onClick={decreaseQuantity} sx={{cursor: "pointer"}}/>
                        <span style={{fontSize: "18px"}}>{quantity}</span>
                        <AddIcon onClick={increaseQuantity} sx={{cursor: "pointer"}}/>
                    </div>
                    <button className="btnAddToCart">Ajouter au panier</button>
                </div>

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
