import {FC} from 'react';
import {useState} from "react";

const LoginForm: FC<{}> = ({}) => {


    //const [selected, setSelected] = useState<"Client" | "Admin" | null>(null);
    const [selected, setSelected] = useState<"Client" | "Admin">("Client");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(
            `Email soumis pour ${selected} : ${email} ${
                selected === "Admin" ? `| Mot de passe : ${password}` : ""
            }`
        );
        setEmail("");
        setPassword("");
    };

    return (
        <section>
            <div className="loginContainer">
                <ul>
                    <li onClick={() => setSelected("Client")}
                        style={{ borderBottom: selected === "Client" ? "2px solid black" : "none"}}
                    >
                        Client
                    </li>
                    <li onClick={() => setSelected("Admin")}
                        style={{borderBottom: selected === "Admin" ? "2px solid black" : "none"}}
                    >
                        Admin
                    </li>
                </ul>

                {selected && (
                    <form onSubmit={handleSubmit}>
                        <h2>Entrer l'email</h2>
                        <input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* Affichage du champ de mot de passe uniquement pour Admin */}
                        {selected === "Admin" && (
                            <input
                                placeholder="Mot de passe"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        )}
                        <div style={{display:"flex", justifyContent: "flex-end", margin: "30px 30px 0 0"}}>
                            <button type="submit">Valider</button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );

};

export default LoginForm;
