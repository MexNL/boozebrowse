import axios from "axios";
import {useEffect, useState} from "react";


function CocktailBlock(){

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const [cocktailName, setCocktailName] = useState("");
    const [cocktailInstruction, setCocktailInstruction] = useState("");
    const [cocktailPhoto, setCocktailPhoto] = useState("");

    async function randomApiCall(){
      try{
          const response = await axios.get(`${apiUrl}${apiKey}/random.php`)
          const name = response.data.drinks[0].strDrink;
          const photo = response.data.drinks[0].strDrinkThumb;
          const instruction = response.data.drinks[0].strInstructions;
          setCocktailName(name);
          setCocktailInstruction(instruction);
          setCocktailPhoto(photo);

      }catch (e) {
         console.error("Error retrieving cocktail", e)
      }
    }

    useEffect(() => {
        randomApiCall();
    }, []);

    return (
        <>
            <p>{cocktailName}</p>
            <img src={cocktailPhoto} alt={name} height="100"/>
            <p>{cocktailInstruction}</p>
        </>
    )
}

export default CocktailBlock;