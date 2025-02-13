import {FC} from 'react';
import ProductLayout from "../../components/ProductLayout";


const Dashboard: FC<{}> = ({}) => {
    return (
        <>

            <section style={{padding: "20px 0", margin: "30px 0"}}>

                <h1 className="dashboardTitle">Tous nos produits</h1>
                <div style={{backgroundColor: "black", height: "3px", width: "270px", margin: "auto"}}></div>

                <div className="dashboard">

                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>
                    <ProductLayout/>

                </div>

            </section>

        </>
    );
};

export default Dashboard;
