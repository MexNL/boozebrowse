import axios from "axios";
import '../LoginPage/LoginPage.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";


function LoginPage() {

    const baseNoviUrl = import.meta.env.VITE_API_NOVI_URL;
    const projectId = import.meta.env.VITE_API_PROJECT_KEY;

   const {login} = useContext(AuthContext) ;

   async function handleSubmit(e) {
       e.preventDefault(e)
       try {
           const response = await axios.post(`${baseNoviUrl}api/login`,
               {
                   email: 'regular.user@example.com',
                   password: 'regular123'
               }, {
               header: {
                   'novi-education-project-id': `${projectId}`
               }
               })
           console.log(response);
           login(response.data);
       }
       catch (e) {
           console.error(e);
       }
   }

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

                        <button type="submit" className="login-button" onClick={handleSubmit}>Inloggen</button>
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