import axios from "axios";
import '../LoginPage/LoginPage.css'
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {jwtDecode} from "jwt-decode";


function LoginPage() {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    const baseNoviUrl = import.meta.env.VITE_API_NOVI_URL;
    const projectId = import.meta.env.VITE_API_PROJECT_KEY;

   const {login} = useContext(AuthContext) ;

   async function handleSubmit(e) {
       e.preventDefault(e)
       try {
           const response = await axios.post(`${baseNoviUrl}api/login`,
               {
                   email: mail,
                   password: password,
               }, {
                   headers: {
                       'novi-education-project-id': `${projectId}`
                   }
               })
           const decodedUserId = jwtDecode(response.data.token);
            //DIT MOET UITGECOMMENT WORDEN TOT DE API IS GEFIXT
           //HIER GEBLEVEN
           // console.log(decodedUserId);
           // const userIdTest = decodedUserId.userId;
           // console.log(userIdTest);
           // const profileResponse = await axios.get(`${baseNoviUrl}api/user_profiles/${userIdTest}`, {
           //     headers: {
           //         'novi-education-project-id': `${projectId}`,
           //         'Authorization': `Bearer ${response.data.token}`
           //     }
           // })

           const dataWithCocktailIds = {
               ...response.data,
               user: {
                   ...response.data.user,

                   // cocktail_ids: profileResponse.data.cocktail_ids || []
               }
           };
           console.log(response);
           login(dataWithCocktailIds);
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
                        <label htmlFor="mail">Username</label>
                        <input
                            type="text"
                            id="mail"
                            name="mail"
                            placeholder="Mail address"
                            className="login-input"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Wachtwoord"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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