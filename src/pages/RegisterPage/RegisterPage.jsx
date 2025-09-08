import axios from "axios";
import '../RegisterPage/RegisterPage.css'
import {Link} from "react-router-dom";
import {useState} from "react";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("")

    const baseNoviUrl = import.meta.env.VITE_API_NOVI_URL;
    const projectId = import.meta.env.VITE_API_PROJECT_KEY;

    async function handleSubmit(e){
        e.preventDefault(e);
        if(password !== confirmPassword){
            console.error("Password does not match")
            return;
        }

        try {
            await axios.post(`${baseNoviUrl}api/users`,
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'novi-education-project-id': `${projectId}`
                    }
                });
            console.log("Account aangemaakt heur")
            setMessage("Account succesfully created")
        }

        catch(e){
            console.error(e);
            if(e.response && e.response.status === 400){
                setMessage("Mail already exists or invalid request.")
            } else {
                setMessage("Something went wrong, try again")
            }

        }
    }

    return (
        <div className="main-container">
            <section className="register-container">
                <header className="register-header">
                    <h1>Register</h1>
                </header>
                {message && <h3>{message}</h3>}
                <article className="register-container-body">
                    <form>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Mail adress"
                            className="register-input"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="register-input"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Repeat Password"
                            className="register-input"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button type="submit" className="register-button" onClick={handleSubmit}>Register</button>
                    </form>

                    <footer className="register-footer">
                        <p>
                            Already have an account?{" "}
                            <Link to="../LoginPage">Login here</Link>
                        </p>
                    </footer>
                </article>

            </section>
        </div>
    )
}

export default RegisterPage;