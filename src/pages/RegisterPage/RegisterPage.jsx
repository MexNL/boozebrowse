
import axios from "axios";
import '../RegisterPage/RegisterPage.css'
import { Link } from "react-router-dom";

function RegisterPage(){

    return(
        <div className="main-container">
            <section className="register-container">
                <header className="register-header">
                    <h1>Register</h1>
                </header>

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
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="register-input"
                            required
                        />

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Repeat Password"
                            className="register-input"
                            required
                        />

                        <button type="submit" className="register-button">Register</button>
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