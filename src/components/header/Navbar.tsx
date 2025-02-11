import {FC} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import logo from "../../images/glam_skincare_logo.png"

const Navbar: FC<{}> = ({}) => {

    return (
        <>

            <nav className="navbar">
                <div>
                    <SearchIcon sx={{fontSize:"35px", cursor: "pointer"}}/>
                </div>

                <div>
                    <a href="/" className="logo">
                        <img src={logo} alt="Glam Skincare Logo" className="logo-image"
                        style={{width:"150px"}}/>
                    </a>
                </div>

                <div>
                    <ShoppingBagIcon sx={{fontSize: "30px", cursor: "pointer"}}/>
                </div>


            </nav>

        </>
    );
};

export default Navbar;
