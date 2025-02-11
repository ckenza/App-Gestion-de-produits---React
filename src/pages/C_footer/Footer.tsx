import React from "react";
import logo from "../../images/glam_skincare_logo.png"

const Footer = () => {
    return (
        <footer>
            {/* Logo */}
            <a>
                <img src={logo} alt="Glam skincare Logo" style={{width:"150px"}}/>
            </a>

            {/* Links */}
            <ul>
                <li>
                    <a href="#">
                        Condition d'utilisation de Glam Skincare
                    </a>
                </li>

                <li>
                    <a href="#">
                        Politique de Cookies
                    </a>
                </li>

                <li>
                    <a href="#">
                        A Propos de Glam Skincare
                    </a>
                </li>

                <li>
                    <a href="#">
                        Gérer les préférences de confidentialité
                    </a>
                </li>
            </ul>

            {/* Footer Text */}
            <p>
                © Glam Skincare, Tous droits réservés
            </p>
        </footer>
    );
};

export default Footer;
