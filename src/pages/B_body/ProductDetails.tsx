import {FC, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {Add} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {get} from "../../API/api";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    stock: number;
}

interface RouteParams extends Record<string, string | undefined> {
    id: string;
}

const ProductDetails: FC = () => {
    const {id} = useParams<RouteParams>();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        const response = await get(`/product/${id}`);
        if (response) {
            setProduct(response);
        }
    };

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

            <div className="imageProduct" style={{backgroundImage: `url(${product.image})`}}></div>

            <div className="details">

                <h2 className="productTitle">{product.title}</h2>
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

                        <div className="detailHeader"
                             onClick={(e) => e.currentTarget.nextElementSibling?.classList.toggle("open")}>
                            <span className="detailTitle">Description</span>
                            <span className="detailIcon"><Add/></span>
                        </div>

                        <div className="detailContent">
                            <p>Aucune description disponible.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
