import {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {post} from "../../API/api";

interface RegisterInput{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
}

const RegisterForm: FC<{}> = ({}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        defaultValues : {
            firstName : "",
            lastName : "",
            email: "",
            password : "",
            password_confirmation : "",
            role: "USER"
        },
    })

    const postUser = async(data: RegisterInput)=> {
        try {
            const response = await post("/auth/register", {
                firstName : data.firstName,
                lastName : data.lastName,
                email : data.email,
                password : data.password,
                role : "USER"
            })
            console.log(response)

            if ((typeof response === 'string' && response.includes('successfully'))
            ) {
                console.log("Inscription réussie, redirection vers /connexion");
                navigate('/connexion');
            } else {
                console.log("Échec de l'inscription:", response);
                setError(response.message || response || "Erreur lors de l'inscription");
            }

        } catch (e){
            console.warn("Une erreur s'est produite pendant l'inscription : ", e);
            setError("Une erreur inattendue s'est produite");
        }
    }

    const onSubmit: SubmitHandler<RegisterInput> = async (data: RegisterInput) => {
        setError("");
        await postUser(data)
    }

    const password = watch("password");

    return (
        <section className="auth">
            <div className="authContainer">
                <h1 style={{fontSize: "35px", textAlign: "center"}}>Inscription</h1>
                <p style={{textAlign: "center"}}>
                    Déjà inscrit(e) ?
                    <a
                        onClick={() => navigate("/connexion")}
                        style={{textDecoration: "underline", cursor: "pointer"}}
                    >
                        Connectez-vous !
                    </a>
                </p>
                <form style={{margin: "50px auto"}} onSubmit={handleSubmit(onSubmit)}>
                    <label>Nom*</label>
                    <input
                        placeholder="nom"
                        type="text"
                        required
                        {...register("firstName")}
                    />
                    <label>Prénom*</label>
                    <input
                        placeholder="prenom"
                        type="text"
                        required
                        {...register("lastName")}
                    />
                    <label>Email*</label>
                    <input
                        placeholder="exemple@gmail.com"
                        type="email"
                        /*value={email}
                       onChange={(e) => setEmail(e.target.value)} */
                        required
                        {...register("email")}
                    />
                    <label>Mot de passe*</label>
                    <input
                        placeholder="mot de passe"
                        type="password"
                        /* value={password}
                        onChange={(e) => setPassword(e.target.value)} */
                        {...register("password", {required: "Password is required"})}
                    />
                    <label>Confirmer le mot de passe*</label>
                    <input
                        placeholder="confirmer le mot de passe"
                        type="password"
                        {...register("password_confirmation",
                            {
                                required: "Veuillez confirmer le mot de passe",
                                validate: (value) => value === password || "Les mots de passes ne sont pas identiques"
                            })}
                    />

                    {errors.password_confirmation &&
                        <p style={{color: "red"}}>{errors.password_confirmation.message}</p>}
                    {error && (<p style={{color: "red"}}>{error}</p>)}

                    <div style={{display: "flex", justifyContent: "center", margin: "30px 30px 0 0"}}>
                        <button type="submit">Valider</button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default RegisterForm;
