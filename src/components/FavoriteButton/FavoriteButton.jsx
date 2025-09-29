import {useState} from "react";
import axios from "axios";

function FavoriteButton ({cocktailId, userId, defaultFavo = false}) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_NOVI_URL;
    const projectId = import.meta.env.VITE_API_PROJECT_KEY;

    const [favorite, toggleFavorite] = useState(defaultFavo);
    console.log(userId)
    async function toggle(){
        // Toevoegen > Haal alle id's op, zet ze in een array voeg de laatste toe en geef terug (put actie)
        // Verwijderen Haal alle id's op, zet ze in een array, verwijder die je weg wil en geef terug (put)
        const response = await axios.get(`${apiUrl}api/user_profiles/${userId}`, {
            headers:{
                'novi-education-project-id': `${projectId}`
            }
        });
        console.log(response);
        let cocktailIdsRaw = response.data.cocktail_ids || [];
        let cocktailIds = [];

        if (Array.isArray(cocktailIdsRaw)) {
            cocktailIds = cocktailIdsRaw.map(id => String(id).trim());
        } else if (typeof cocktailIdsRaw === "string") {
            cocktailIds = cocktailIdsRaw.split(",").map(id => id.trim());
        }
        const newCocktailIdsString = cocktailIds.join(",");

        await axios.put(`${apiUrl}api/user_profiles/${userId}`,
            {
                id: userId,
                user_id: userId,
                cocktail_ids: newCocktailIdsString
            },
            {headers: {
                    'novi-education-project-id': `${projectId}`
                }}
        );

        toggleFavorite(!favorite);
    }
    // if (!userId) return console.error("userId ontbreekt!");
    return (
        <button className={`favotireButton ${favorite ? "active" : ""}`} onClick={toggle}>
            {favorite ? "❤️" : "🤍"}
        </button>
    );
}

export default FavoriteButton;
