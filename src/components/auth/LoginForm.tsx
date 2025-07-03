import {FC} from 'react';
import {useState} from "react";
import {data, useLocation, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {post} from "../../API/api";
import {useAuth} from "../../contexts/AuthContext";

interface LoginInput{
    email: string;
    password: string;
}

const LoginForm: FC<{}> = ({}) => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const location = useLocation();

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues : {
            email : "",
            password : ""
        },
    })

    const postUser = async(data: LoginInput) => {
        try {
            const response = await post("/auth/login", {
                email : data.email,
                password : data.password
            })

            let token = null;

            if (response.data?.token) {
                token = response.data.token;
                console.log("token : ", token)
            } else {
                token = response;
            }

            if(token){
                login(token);
                navigate('/dashboard');

            }
        } catch (e){
            console.log("Aucun token trouvé dans la réponse");
            setError("Erreur de connexion - aucun token reçu");
        }
    }

    const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
        setError("");
        await postUser(data)
    }

    return (
        <section className="auth">
            <div className="authContainer">
                <h1 style={{fontSize: "35px", textAlign: "center"}}>Connexion</h1>
                <p style={{textAlign: "center"}}>
                    Vous n'avez pas encore de compte ?
                    <a
                        onClick={() => navigate("/inscription")}
                        style={{textDecoration: "underline", cursor: "pointer"}}
                    >
                        Inscivez-vous ici !
                    </a>
                </p>
                <form style={{margin: "50px auto"}} onSubmit={handleSubmit(onSubmit)}>
                    <label>Email</label>
                    <input
                        placeholder="exemple@gmail.com"
                        type="email"
                        /* value={email}
                        onChange={(e) => setEmail(e.target.value)} */
                        required
                        {...register("email")}
                    />
                    <label>Mot de passe</label>
                    <input
                        placeholder="mot de passe"
                        type="password"
                        /* value={password}
                        onChange={(e) => setPassword(e.target.value)} */
                        required
                        {...register("password")}
                    />

                    {error && (<p style={{color: "red"}}>{error}</p>)}
                    <div style={{display:"flex", justifyContent: "center", margin: "30px 30px 0 0"}}>
                        <button type="submit">Valider</button>
                    </div>
                </form>

                {modal && (
                    <div style={{
                        position: "fixed",
                        top: 20,
                        right: 20,
                        backgroundColor: "#d2f8d2",
                        color: "black",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        zIndex: 1000
                    }}>
                        Connecté(e) !
                    </div>
                )}
            </div>
        </section>
    );

};

export default LoginForm;
