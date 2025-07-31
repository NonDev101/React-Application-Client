import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ApiKey } from "./SearchPage"; ////ApiKey
import "../css/RecipeDetails.css";

function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const handleBack = () => {
    navigate(`/?search=${encodeURIComponent(searchQuery || "")}`);
  };

  useEffect(() => {
    if (!id) return;

    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${ApiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [id]);

  return (
    <>
      <div>
        <button onClick={handleBack}>← Back</button>
        <h1>{recipe.title}</h1>
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ maxWidth: "400px" }}
          />
        )}
        <p>
          <strong>Ready in:</strong> {recipe.readyInMinutes} mins
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>

        {recipe.diets?.length > 0 && (
          <p>
            <strong>Diets:</strong> {recipe.diets.join(", ")}
          </p>
        )}

        {recipe.dishTypes?.length > 0 && (
          <p>
            <strong>Dish types:</strong> {recipe.dishTypes.join(", ")}
          </p>
        )}

        <h2>Instructions</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: recipe.instructions || "<p>No instructions.</p>",
          }}
        />

        <h2>Ingredients</h2>
        <ul>
          {recipe.extendedIngredients?.map((ing: any) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecipeDetail;
