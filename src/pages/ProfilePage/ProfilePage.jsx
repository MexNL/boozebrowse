import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import CocktailBlockIds from "../../components/CocktailBlockIds/CocktailBlockIds.jsx";


function ProfilePage() {
    const {isAuth, name, status, email, cocktail_ids} = useContext(AuthContext);
    const testArray = [15182];





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
                            </div>
                            <p><strong>Name:</strong> {name}</p>
                            <p><strong>Email:</strong> {email}</p>
                        </section>

                    </aside>
                    <section className="saved-cocktails">
                        <header>
                            <h2>Saved Cocktails</h2>
                        </header>
                        <article>
                            <CocktailBlockIds ids={testArray}/>
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
