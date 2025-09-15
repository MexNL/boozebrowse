import CocktailBlockIds from "../../components/CocktailBlockIds/CocktailBlockIds.jsx";
import {useParams} from "react-router-dom";

function ProductPage() {
    const { id } = useParams();

    return (
        <div className="profile-page">
            <main className="profile-layout">
                <section className="saved-cocktails">
                    <header>
                        <h2>Cocktail Details</h2>
                    </header>
                    <article>
                        <CocktailBlockIds ids={[id]} />
                    </article>
                </section>
            </main>
        </div>
    );
}

export default ProductPage;
