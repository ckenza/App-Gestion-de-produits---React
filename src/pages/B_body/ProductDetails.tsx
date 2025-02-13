import {FC, useState} from 'react';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {Add} from "@mui/icons-material";

const ProductDetails: FC<{}> = ({}) => {

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    return (
        <>

            <section className="productDetails">

            <div className="imageProduct"></div>

                <div className="details">
                    <h2 className="productTitle">Titre</h2>
                    <p style={{margin: "20px 0"}}>Prix</p>

                    <div className="addToCart">
                        <div>
                            <div style={{display: "flex", width: "100px", justifyContent: "space-between"}}>
                                <RemoveIcon onClick={decreaseQuantity} sx={{cursor: "pointer"}}/>
                                <span style={{fontSize: "18px"}}>{quantity}</span>
                                <AddIcon onClick={increaseQuantity} sx={{cursor: "pointer"}}/>
                            </div>
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

        </>
    );
};

export default ProductDetails;
