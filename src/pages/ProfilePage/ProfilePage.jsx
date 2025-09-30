import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import CocktailBlockIds from "../../components/CocktailBlockIds/CocktailBlockIds.jsx";
import axios from "axios";
import "../ProfilePage/ProfilePage.css"



function ProfilePage() {

    const apiUrl = import.meta.env.VITE_API_NOVI_URL;
    const projectId = import.meta.env.VITE_API_PROJECT_KEY;

    // const testArray = ['14888', '12674', '11052'];

    const {isAuth, name, status, email, cocktail_ids, id, user} = useContext(AuthContext);
    const [cocktailIds, setCocktailIds] = useState([]);
    const [cocktailIdsString, setCocktailIdsString] = useState([]);
    async function refreshCocktailIds(userId) {
        try {
            const response = await axios.get(`${apiUrl}api/user_profiles/${userId}`, {
                headers: {
                    'novi-education-project-id': projectId
                }
            });

            let cocktailIdsRaw = response.data.cocktail_ids || [];
            let cocktailIdsB = [];

            if (Array.isArray(cocktailIdsRaw)) {
                cocktailIdsB = cocktailIdsRaw.map(id => String(id).trim());
            } else if (typeof cocktailIdsRaw === "string") {
                cocktailIdsB = cocktailIdsRaw.split(",").map(id => id.trim());
            }
            console.log("Parsed cocktail IDs:", cocktailIdsB);
            setCocktailIds(cocktailIdsB);
            setCocktailIdsString(cocktailIdsRaw);

        } catch (error) {
            console.error("Error fetching cocktail IDs:", error);
        }
    }


    useEffect(() => {
        if (id) {
            refreshCocktailIds(id);
        }
    }, [id]);

    return (
        <div className="profile-page">
            {isAuth ? (
                <main className="profile-layout">
                    <aside className="login-container">
                        <header className="login-header">Profile</header>
                        <section className="login-container-body">
                            <div className="profile-image">
                                <img
                                    src="https://via.placeholder.com/120"
                                    alt="Profile"
                                />
                                <p>{cocktailIdsString}</p>

                            </div>
                        </section>
                    </aside>
                    <section className="saved-cocktails">
                        <header>
                            <h2>Saved Cocktails</h2>
                        </header>
                        <article>
                            {cocktailIds.length > 0 ? (
                                <CocktailBlockIds ids={cocktailIds}/>
                            ) : (
                                <p>Loading saved cocktails...</p>
                            )}
                        </article>
                    </section>
                </main>

                //Test dingetje


            ) : (
                <p>Something went wrong</p>
            )}
        </div>
    )
}

export default ProfilePage;
