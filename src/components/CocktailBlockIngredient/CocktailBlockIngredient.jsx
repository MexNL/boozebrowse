import axios from "axios";
import {useEffect, useState} from "react";
import ozToMl from "../../helpers/ozToMl.js";
import "./CocktailBlockIngredient.css"


function CocktailBlockIngredient({search, input}) {

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const [cocktailName, setCocktailName] = useState("");
    const [cocktailInstruction, setCocktailInstruction] = useState("");
    const [cocktailPhoto, setCocktailPhoto] = useState("");
    const [cocktailCategory, setCocktailCategory] = useState("")
    const [cocktailAlcohol, setCocktailAlcohol] = useState("")
    const [cocktailIngredients, setCocktailIngredients] = useState([]);
    const [cocktailId, setCocktailId] = useState(0);
    const [responseIdMap, setResponseIdMap] = useState([]);

    // async function searchCocktailId() {
    //     try{
    //
    //         console.log(responseIdMap);
    //     } catch (e) {
    //         console.error("Error retrieving cocktail", e)
    //     }
    // }



    async function searchApiCall() {
        try {

            // ophalen van de ID's van de cocktails van het ingredient (array)
            const idResponse = await axios.get(`${apiUrl}${apiKey}/filter.php?${search}=${cocktailId}`)
            const responseIdArray = idResponse.map(idResponse => idResponse.idDrink);
            setResponseIdMap(responseIdArray)
            console.log(responseIdMap);
            const response = await axios.get(`${apiUrl}${apiKey}/lookup.php?${search}=${input}`)
            const name = response.data.drinks[0].strDrink;
            const photo = response.data.drinks[0].strDrinkThumb;
            const instruction = response.data.drinks[0].strInstructions;
            const category = response.data.drinks[0].strCategory;
            const alcoholic = response.data.drinks[0].strAlcoholic;
            setCocktailName(name);
            setCocktailInstruction(instruction);
            setCocktailPhoto(photo);
            setCocktailCategory(category);
            setCocktailAlcohol(alcoholic);

            const ingredientList = [];

            for (let i = 1; i <= 15; i++) {
                const ingredient = response.data.drinks[0][`strIngredient${i}`];
                const measurement = response.data.drinks[0][`strMeasure${i}`];
                if (ingredient) {
                    const amount = measurement ? parseFloat(measurement) : 0;
                    ingredientList.push({
                        ingredient, measurement: amount ? ozToMl(amount) : ""
                    })
                }
            }

            setCocktailIngredients(ingredientList);


        } catch (e) {
            console.error("Error retrieving cocktail", e)
        }
    }


    useEffect(() => {
        searchApiCall();
    }, [search, input]);

    return (
        <div className="cocktail-container">
            <header className="cocktail-header">
                <h3>{cocktailName}</h3>
                <h3>{cocktailAlcohol}</h3>
            </header>
            <div className="cocktail-container-body">
                <section className="cocktail-section-one">
                    <img src={cocktailPhoto} alt={name}/>
                    <h4>Ingredients</h4>
                    <ul className="cocktail-section-one-ul">
                        {cocktailIngredients.map((item, index) => (
                            <li key={index}>
                                {item.measurement ? `${item.measurement} ml` : ""} {item.ingredient}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="cocktail-section-two">
                    <div><h4>Catagory:</h4> <p>{cocktailCategory}</p></div>
                    <div><h4>Instructions:</h4> <p>{cocktailInstruction}</p></div>
                </section>
            </div>

        </div>
    )
}

export default CocktailBlockIngredient;