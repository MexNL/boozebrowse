import "./HomePage.css"
import CocktailBlock from "../components/CocktailBlock/CocktailBlock.jsx";

function HomePage(){

    return(
        <div>
            <section className="section-one">
                <img src="src/assets/bottles.png" alt="Bar with bottles"/>
                <h2>Discover your next favorite cocktail</h2>
                <hr/>
            </section>

            <section>
                <CocktailBlock/>
                <br/>
                <CocktailBlock/>
                <br/>
                <CocktailBlock/>
            </section>
        </div>
    )
}

export default HomePage;