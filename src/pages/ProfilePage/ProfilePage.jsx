import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import CocktailBlockIds from "../../components/CocktailBlockIds/CocktailBlockIds.jsx";

function ProfilePage() {
    const {  isAuth ,name ,status, email, cocktail_ids } = useContext(AuthContext);
    const testArray = [15182];

    return (
        <div>
            {isAuth? (
                <main>
                    <p>Email: {email}</p>
                    <p>{status}</p>
                    <p>{name}</p>
                    <p>{cocktail_ids}</p>
                    <CocktailBlockIds ids={testArray}/>
                </main>

            ): (
                <p>Something went wrong</p>
            )}
        </div>
    )}

export default ProfilePage;
