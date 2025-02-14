import {FC, useEffect, useState} from 'react';
import {get} from "../../API/api";
import ProductLayout from '../../components/ProductLayout';

const Dashboard: FC = () => {
    const [productList, setProductList] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productAPI = await get('/product/all');
                console.log("Réponse brute de l'API :", productAPI); // Vérifie ce que l'API renvoie

                if (productAPI) {
                    const productArray = Object.values(productAPI); // Convertir en tableau
                    setProductList(productArray);
                } else {
                    console.warn("L'API ne retourne pas de produits.");
                    setProductList([]);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
                setProductList([]); // Gestion des erreurs
            }
        };

        fetchProducts();
    }, []);


    return (
        <section style={{padding: "20px 0", margin: "30px 0"}}>
            <h1 className="dashboardTitle">Tous nos produits</h1>
            <div style={{backgroundColor: "black", height: "3px", width: "270px", margin: "auto"}}></div>

            <div className="dashboard">
                {productList.length > 0 ? (
                    productList.map((product: any) => (
                        <ProductLayout key={product.id} product={product}/>
                    ))
                ) : (
                    <p>Aucun produit disponible.</p>
                )}
            </div>
        </section>
    );
};

export default Dashboard;
