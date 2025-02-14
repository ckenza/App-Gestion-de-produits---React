import {FC, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import logo from "../../images/glam_skincare_logo.png";
import PersonIcon from '@mui/icons-material/Person';
import {ProductItem} from "../../@types/product"; // Import de l'interface
import "../../App.css"



const Navbar: FC<{}> = ({}) => {

    const navigate = useNavigate();

    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<ProductItem[]>([]); // Utilisation de ProductItem
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = async (query: string) => {
        if (!query) return;
        setIsLoading(true);

        try {
            const response = await axios.get(`http://localhost:8080/product/search?query=${query}`)
            console.log(response)

            setProducts(response.data || []); // Assure que la réponse est bien un tableau
        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            const debounce = setTimeout(() => fetchProducts(searchQuery), 500);
            return () => clearTimeout(debounce);
        }
    }, [searchQuery]);

    return (
        <>
            <nav className="navbar">
                <div>
                    <SearchIcon sx={{fontSize: "35px", cursor: "pointer"}}
                                onClick={() => setSearchVisible(!searchVisible)}/>
                </div>

                <div>
                    <Link to="/" className="logo">
                        <img src={logo} alt="Glam Skincare Logo" className="logo-image"
                             style={{width: "150px"}}/>
                    </Link>
                </div>

                <Link style={{color: "black"}} to="/Panier">
                    <div>
                        <ShoppingBagIcon sx={{fontSize: "30px", cursor: "pointer"}}/>
                    </div>
                </Link>

                <Link style={{color: "black"}} to="/Connexion">
                    <PersonIcon sx={{fontSize: "35px", cursor: "pointer"}}/>
                </Link>
            </nav>

            {searchVisible && (
                <div className="searchBar">
                    <input type="text" placeholder="Rechercher un produit" className="searchInput"
                           onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Affichage des résultats de recherche */}
                    <div className="searchResults">
                        {products.length > 0 && (
                            <ul>
                                {products.map((product) => (
                                    <li key={product.idProduct} className="searchResultItem"
                                        onClick={() => navigate(`ProductDetails/${product.idProduct}`)}>
                                        <img src={product.imageUrl} alt={product.titleProduct}
                                             style={{width: "50px", marginRight: "10px"}}/>
                                        <span>{product.titleProduct} - {product.price}€</span>
                                    </li>
                                ))}
                            </ul>
                        ) }
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
