import axios from "axios";
import {useContext, useEffect, useState} from "react";
import ozToMl from "../../helpers/ozToMl.js";
import "../CocktailBlockIngredient/CocktailBlockIngredient.css";
import {Link} from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function CocktailBlockIds({ ids = []}) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const [cocktails, setCocktails] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const batchSize = 20;
    const [loading, setLoading] = useState(false);

    const { isAuth, id: profileId, user, cocktail_ids } = useContext(AuthContext);

    async function fetchBatch(index) {
        const batchIds = ids.slice(index, index + batchSize);
        if (batchIds.length === 0) return;

        try {
            setLoading(true);
            const cocktailPromises = batchIds.map((id) =>
                axios.get(`${apiUrl}${apiKey}/lookup.php?i=${id}`)
            );
            const cocktailResponses = await Promise.all(cocktailPromises);


            const drinks = cocktailResponses.map((res) => {
                const drink = res.data.drinks[0];
                const ingredientList = [];



                for (let i = 1; i <= 15; i++) {
                    const ingredient = drink[`strIngredient${i}`];
                    const measurement = drink[`strMeasure${i}`];
                    if (ingredient) {
                        const amount = measurement ? parseFloat(measurement) : 0;
                        ingredientList.push({
                            ingredient,
                            measurement: amount ? ozToMl(amount) : "",
                        });
                    }
                }

                return { ...drink, ingredients: ingredientList };
            });

            setCocktails((prev) => [...prev, ...drinks]);
            setCurrentIndex((prev) => prev + batchSize);
        } catch (err) {
            console.error("Error fetching cocktails:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setCocktails([]);
        setCurrentIndex(0);
        if (ids.length > 0) {
            fetchBatch(0);
        }
    }, [ids]);

    return (
        <div className="main-component-container">
            {loading && <div>Laden...</div>}
            <div className="main-container">
                {cocktails.map((cocktail, idx) => (
                    <div key={idx} className="cocktail-container">
                        <header className="cocktail-header">
                            <Link to={`/product/${cocktail.idDrink}`}><h3>{cocktail.strDrink}</h3></Link>
                            <h3>{cocktail.strAlcoholic}</h3>
                            {isAuth && (
                                <FavoriteButton
                                    cocktailId={cocktail.idDrink}
                                    userId={profileId}
                                    defaultFavo={cocktail_ids.includes(cocktail.idDrink)}
                                />
                            )}
                        </header>
                        <div className="cocktail-container-body">
                            <section className="cocktail-section-one">
                                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
                                <h4>IBA</h4>
                                <p>{cocktail.strIBA ? cocktail.strIBA : "No IBA found"}</p>
                                <h4>Glass</h4>
                                <p>{cocktail.strGlass}</p>
                                <h4>Ingredients</h4>
                                <ul className="cocktail-section-one-ul">
                                    {cocktail.ingredients.map((item, index) => (
                                        <li key={index}>
                                            {item.measurement ? `${item.measurement} ml` : ""}{" "}
                                            {item.ingredient}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="cocktail-section-two">
                                <div>
                                    <h4>Category:</h4> <p>{cocktail.strCategory}</p>
                                </div>
                                <div>
                                    <h4>Instructions:</h4>{" "}
                                    <p>{cocktail.strInstructions}</p>
                                </div>
                            </section>
                        </div>
                    </div>
                ))}
            </div>
            <div className="load-more">
                {currentIndex < ids.length && (
                    <button onClick={() => fetchBatch(currentIndex)}>Load More</button>
                )}
            </div>
        </div>
    );
}

export default CocktailBlockIds;
