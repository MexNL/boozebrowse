import "./SearchPage.css"
import {useState} from "react";




function SearchPage(){

    return(
        <div className="search-container">
            <section className="search-container-input">
                <form className="search-container-input-form">
                    <label for="cocktail_search">Search cocktail by: </label>
                    <select id="cocktail_search" name="cocktail_dropdown_input">
                        <option value="search_cocktail_by_name">Name</option>
                        <option value="search_cocktail_by_ingredient">Ingredient</option>
                        <option value="search_cocktail_by_first_letter">First letter</option>
                        <option value="random_cocktail">Random</option>
                    </select>
                </form>
                <input type="text" id="cocktail-search-bar"/>
            </section>

            <section className="search-container-output">


            </section>

        </div>

    )
}

export default SearchPage;