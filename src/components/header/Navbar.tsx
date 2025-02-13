import {FC, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import logo from "../../images/glam_skincare_logo.png";
import PersonIcon from '@mui/icons-material/Person';
import {Link} from "react-router-dom";

const Navbar: FC<{}> = ({}) => {

    const [searchVisible, setSearchVisible] = useState(false);

    return (
        <>

            <nav className="navbar">
                <div>
                    <SearchIcon sx={{fontSize:"35px", cursor: "pointer"}}
                                onClick={() => setSearchVisible(!searchVisible)}/>
                </div>



                <div>
                    <a href="/" className="logo">
                        <img src={logo} alt="Glam Skincare Logo" className="logo-image"
                        style={{width:"150px"}}/>
                    </a>
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
                    <input type="text" placeholder="Rechercher un produit" className="searchInput"/>
                </div>
            )}

        </>
    );
};

export default Navbar;
