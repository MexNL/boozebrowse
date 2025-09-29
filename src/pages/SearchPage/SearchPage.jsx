import "./SearchPage.css"
import {useState} from "react";
import CocktailBlockName from "../../components/CocktailBlockName/CocktailBlockName.jsx";
import CocktailBlockRandom from "../../components/CocktailBlockRandom/CocktailBlockRandom.jsx";
import CocktailBlockIngredient from "../../components/CocktailBlockIngredient/CocktailBlockIngredient.jsx";

function SearchPage() {

    const [type, setType] = useState("");
    const [searchType, setSearchType] = useState("");
    const [searchReset, setSearchReset] = useState(0);

    const choice = (e) => {
        setType(e.target.value);
    }

    const choiceType = (e) => {
        setSearchType(e.target.value);
    }

    const handleSearchClick = () => {
        setSearchReset(prev => prev + 1);
    }

    return (
        <div className="search-container">
            <section className="search-container-input">
                <form className="search-container-input-form" onSubmit={e => e.preventDefault()}>
                    <label htmlFor="cocktail_search">Search cocktail by: </label>
                    <select id="cocktail_search" name="cocktail_dropdown_input" value={type} onChange={choice}>
                        <option>Choose</option>
                        <option value="s">Name</option>
                        <option value="i">Ingredient</option>
                        <option value="f">First letter</option>
                        <option value="random_cocktail">Random</option>
                    </select>

                    <input type="text" id="cocktail-search-bar" value={searchType} onChange={choiceType}/>
                    <button type="button" onClick={handleSearchClick}>
                        Search
                    </button>
                </form>
            </section>

            <section className="search-container-output">
                {searchReset > 0 && (
                    <>
                        {(type === "s" && searchType.trim() !== "") || (type === "f" && searchType.trim().length === 1) ? (
                            <CocktailBlockName key={searchReset} search={type} input={searchType}/>
                        ) : null}

                        {type === "i" && searchType.trim() !== "" ? (
                            <CocktailBlockIngredient key={searchReset} ingredient={searchType}/>
                        ) : null}

                        {type === "random_cocktail" ? (
                            <>
                                <CocktailBlockRandom key={searchReset + "_1"} />
                                <CocktailBlockRandom key={searchReset + "_2"} />
                            </>
                        ) : null}
                    </>
                )}

            </section>
        </div>
    );
}

export default SearchPage;
