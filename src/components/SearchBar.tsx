import {FC, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ProductItem} from "../@types/product";
import axios from "axios";
import "../App.css";

interface SearchBarProps {
    visible: boolean;
    onClose: () => void;
}

const SearchBar: FC<SearchBarProps> = ({visible, onClose}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<ProductItem[]>([]); // Utilisation de ProductItem
    const [isLoading, setIsLoading] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchQuery || isInputFocused) {
            const fetchProducts = async (query: string) => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8080/product/search?query=${query}`)
                    setProducts(response.data || []); // Assure que la réponse est bien un tableau
                } catch (error) {
                    console.error("Erreur lors de la récupération des produits :", error);
                } finally {
                    setIsLoading(false);
                }
            };

            const debounce = setTimeout(() => fetchProducts(searchQuery), 500);
            return () => clearTimeout(debounce);
        }
    }, [searchQuery, isInputFocused]);

    useEffect(() => {
        if (!visible) return;

        // Délai pour éviter de capter le premier clic qui a ouvert la search bar
        const timer = setTimeout(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                    onClose();
                }
            };

            document.addEventListener("click", handleClickOutside);

            // Cleanup
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, 0);

        return () => {
            clearTimeout(timer);
        };
    }, [visible]);


    if(!visible) return null;

    return (
        <div className="searchBar" ref={inputRef}>
            <input
                type="text"
                placeholder="Rechercher un produit"
                className="searchInput"
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
            />

            {/* Affichage des résultats de recherche */}
            <div className="searchResults">
                {isLoading && <p>Chargement...</p>}
                {!isLoading && products.length > 0 ? (
                    <ul className="result-option">
                        {products.map((product) => (
                            <li key={product.idProduct} className="searchResultItem"
                                onClick={() => {
                                    navigate(`/ProductDetails/${product.idProduct}`)
                                    onClose();
                                    setIsInputFocused(false);
                                }}
                            >
                                <img src={product.imageUrl} alt={product.titleProduct} style={{width: "50px", marginRight: "10px"}}/>
                                <span>{product.titleProduct} - {product.price}€</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !isLoading && searchQuery && <p style={{textAlign: "center"}}>Aucun résultat</p>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
