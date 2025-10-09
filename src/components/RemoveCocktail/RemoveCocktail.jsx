import {useState, useEffect} from "react";
import axios from "axios";

function RemoveCocktail({cocktailId, userId, defaultFavo = false, onRemoved}) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_NOVI_URL;
    const projectId = import.meta.env.VITE_API_PROJECT_KEY;

    const [favorite, toggleFavorite] = useState(defaultFavo);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function checkFavorite() {
            try {
                const response = await axios.get(`${apiUrl}api/user_profiles/${userId}`, {
                    headers: {
                        'novi-education-project-id': `${projectId}`
                    }
                });
                let cocktailIdsRaw = response.data.cocktail_ids || [];
                let cocktailIds = [];

                if (Array.isArray(cocktailIdsRaw)) {
                    cocktailIds = cocktailIdsRaw.map(id => String(id).trim());
                } else if (typeof cocktailIdsRaw === "string") {
                    cocktailIds = cocktailIdsRaw.split(",").map(id => id.trim());
                }

                if (cocktailIds.includes(String(cocktailId))) {
                    toggleFavorite(true);
                }
            } catch (error) {
                console.error("Fout bij checken favorieten:", error);
            }
        }

        checkFavorite();
    }, [cocktailId, userId]);

    async function toggle() {
        try {
            setLoading(true);

            const response = await axios.get(`${apiUrl}api/user_profiles/${userId}`, {
                headers: {
                    'novi-education-project-id': `${projectId}`
                }
            });
            let cocktailIdsRaw = response.data.cocktail_ids || [];
            let cocktailIds = [];

            if (Array.isArray(cocktailIdsRaw)) {
                cocktailIds = cocktailIdsRaw.map(id => String(id).trim());
            } else if (typeof cocktailIdsRaw === "string") {
                cocktailIds = cocktailIdsRaw.split(",").map(id => id.trim());
            }

            cocktailIds = cocktailIds.filter(id => id !== String(cocktailId));

            const newCocktailIdsString = cocktailIds.join(",");

            await axios.put(
                `${apiUrl}api/user_profiles/${userId}`,
                {
                    id: userId,
                    user_id: userId,
                    cocktail_ids: newCocktailIdsString
                },
                {
                    headers: {
                        'novi-education-project-id': `${projectId}`
                    }
                }
            );
            toggleFavorite(false);
            if (onRemoved) onRemoved();
        } catch (error) {
            console.error("Fout bij verwijderen van favorieten:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button className={`favotireButton ${favorite ? "active" : ""}`} onClick={toggle}>
            {loading && <div>Laden...</div>}
            {favorite ? "❌" : ""}
        </button>
    );
}

export default RemoveCocktail;
