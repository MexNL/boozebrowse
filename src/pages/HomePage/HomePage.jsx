import "./HomePage.css"
import CocktailBlockRandom from "../../components/CocktailBlockRandom/CocktailBlockRandom.jsx";
import {Link} from "react-router-dom";

function HomePage() {
//Test dingetje
    const cocktailId = 11007; // test-id's


    return (
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
            <div style={{padding: "1rem", border: "1px solid #ccc"}}>
                <h3>Test Link naar ProductPage</h3>
                <p>
                    <Link to={`/product/${cocktailId}`}>Bekijk cocktail {cocktailId}</Link>
                </p>
            </div>

        </div>
    )
}

export default HomePage;