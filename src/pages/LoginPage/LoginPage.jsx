import axios from "axios";
import '../LoginPage/LoginPage.css'
import {Link} from "react-router-dom";


function LoginPage() {
    return(
        <main className="main-container">
            <section className="login-container">
                <header className="login-header">
                    <h1>Login</h1>
                </header>

                <article className="login-container-body">
                    <form>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Gebruikersnaam"
                            className="login-input"
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Wachtwoord"
                            className="login-input"
                            required
                        />

                        <button type="submit" className="login-button">Inloggen</button>
                    </form>

                    <footer className="login-footer">
                        <p>
                            Don't have an account?
                            <Link to="../RegisterPage">Register here</Link>
                        </p>
                    </footer>
                </article>
            </section>
        </main>

    )
}

export default LoginPage;