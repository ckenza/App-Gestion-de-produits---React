import {FC, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import logo from "../../images/glam_skincare_logo.png";
import PersonIcon from '@mui/icons-material/Person';
import "../../App.css"
import SearchBar from "../SearchBar";
import {useAuth} from "../../contexts/AuthContext";
import {useAddToCartContext} from "../../contexts/AddToCartContext";

const Navbar: FC<{}> = ({}) => {
    const [searchVisible, setSearchVisible] = useState(false);
    const {token, userRole} = useAuth();

    const {cartContent} = useAddToCartContext();
    const totalQuantity = cartContent.reduce((sum, product) => sum + product.quantity, 0);

    const getProfilRoute = () => {
        if(!token){
            return '/connexion'
        }

        switch (userRole) {
            case 'USER' :
                return "/dashboard";
            case "ADMIN":
                return '/admin';
            default:
                return '/connexion'
        }
    };

    return (
        <>
            <header>
                <nav className="navbar">
                    <div>
                        <SearchIcon
                            sx={{fontSize: "35px", cursor: "pointer"}}
                            onClick={() => setSearchVisible(true)}
                        />
                    </div>

                    <div>
                        <Link to="/" className="logo">
                            <img src={logo} alt="Glam Skincare Logo" className="logo-image"
                                 style={{width: "150px"}}/>
                        </Link>
                    </div>

                    <Link style={{color: "black", margin:"0 10px", textDecoration: 'none', position: "relative"}} to="/panier">
                        {totalQuantity > 0 && (
                            <span style={{
                                fontSize: "17px",
                                backgroundColor: "red",
                                borderRadius: "20px",
                                padding: "1px 7px",
                                position: "absolute",
                                right: "23px"
                            }}>{totalQuantity}</span>
                        )}
                        <ShoppingBagIcon sx={{fontSize: "40px", cursor: "pointer"}}/>
                    </Link>

                    <Link style={{color: "black"}} to={getProfilRoute()}>
                        <PersonIcon sx={{fontSize: "40px", cursor: "pointer"}}/>
                    </Link>
                </nav>
            </header>
            {searchVisible && (
                    <SearchBar visible={searchVisible} onClose={() => setSearchVisible(false)}/>
                )
            }

        </>
    );
};

export default Navbar;
