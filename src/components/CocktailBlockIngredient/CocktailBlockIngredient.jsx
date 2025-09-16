import axios from "axios";
import {useEffect, useState} from "react";
import ozToMl from "../../helpers/ozToMl.js";
import "./CocktailBlockIngredient.css";
import {Link} from "react-router-dom";

function CocktailBlockIngredient() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const [allIds, setAllIds] = useState([]);
    const [cocktails, setCocktails] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const batchSize = 20;


    async function fetchBatch(ids, index) {
        const batchIds = ids.slice(index, index + batchSize);
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

            return {...drink, ingredients: ingredientList};
        });

        setCocktails((prev) => [...prev, ...drinks]);
        setCurrentIndex((prev) => prev + batchSize);
    }

    async function initFetch() {
        const idResponse = await axios.get(`${apiUrl}${apiKey}/filter.php?i=Gin`);
        const responseIdArray = idResponse.data.drinks.map((item) => item.idDrink);
        setAllIds(responseIdArray);
        setCocktails([]);
        setCurrentIndex(0);
        fetchBatch(responseIdArray, 0);
    }

    useEffect(() => {
        initFetch();
    }, []);

    return (
        <div className="main-component-container">
            <div className="main-container">
                {cocktails.map((cocktail, idx) => (
                    <div key={idx} className="cocktail-container">
                        <header className="cocktail-header">
                            <Link to={`/product/${cocktail.idDrink}`}><h3>{cocktail.strDrink}</h3></Link>
                            <h3>{cocktail.strAlcoholic}</h3>
                        </header>
                        <div className="cocktail-container-body">
                            <section className="cocktail-section-one">
                                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
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
                {currentIndex < allIds.length && (
                    <button onClick={() => fetchBatch(allIds, currentIndex)}>Load More</button>
                )}
            </div>
        </div>


    );
}

export default CocktailBlockIngredient;
