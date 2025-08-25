import "./HomePage.css"
import CocktailBlockRandom from "../components/CocktailBlockRandom/CocktailBlockRandom.jsx";

function HomePage(){

    return(
        <div>
            <section className="section-one">
                <img src="src/assets/bottles.png" alt="Bar with bottles"/>
                <h2>Discover your next favorite cocktail</h2>
                <hr/>
            </section>

            <section className="section-two">
                <CocktailBlockRandom/>
                <CocktailBlockRandom/>
            </section>
        </div>
    )
}

export default HomePage;