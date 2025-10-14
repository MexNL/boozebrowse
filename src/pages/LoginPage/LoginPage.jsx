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

           const userIdTest = decodedUserId.userId;
           const profileResponse = await axios.get(`${baseNoviUrl}api/user_profiles/${userIdTest}`, {
               headers: {
                   'novi-education-project-id': `${projectId}`,
               }
           })

           const dataWithCocktailIds = {
               ...response.data,
               user: {
                   ...response.data.user,

                   cocktail_ids: Array.isArray(profileResponse.data.cocktail_ids)
                       ? profileResponse.data.cocktail_ids
                       : profileResponse.data.cocktail_ids
                           ? profileResponse.data.cocktail_ids.split(',')
                           : []
               }
           };
           console.log(dataWithCocktailIds);
           login(dataWithCocktailIds);
       }
       catch (e) {
           console.error(e);
       }
   }

    return(
        <div className="main-container">
            <section className="auth-container">
                <header className="auth-header">
                    <h1>Login</h1>
                </header>

                <article className="auth-body">
                    <form>
                        <label htmlFor="mail">Email</label>
                        <input
                            type="text"
                            id="mail"
                            name="mail"
                            placeholder="Mail address"
                            className="auth-input"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className="auth-button" onClick={handleSubmit}>Login</button>
                    </form>

                    <footer className="auth-footer">
                        <p>
                            Don't have an account?{" "}
                            <Link to="../RegisterPage">Register here</Link>
                        </p>
                    </footer>
                </article>
            </section>
        </div>


    )
}

export default LoginPage;