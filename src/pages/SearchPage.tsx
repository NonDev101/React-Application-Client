import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const ApiKey = "07b5cfadf15f4a36938ca43c39cdf196";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get "search" from URL
  const searchParams = new URLSearchParams(location.search);
  const searchFromURL = searchParams.get("search") || "";

  const [dish, setDish] = useState(searchFromURL);
  const [output, setOutput] = useState({ results: [] });

  // Trigger search when URL param changes (e.g., after going back)
  useEffect(() => {
    if (!searchFromURL) return;

    setDish(searchFromURL); // update input field
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
        searchFromURL
      )}&apiKey=${ApiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOutput(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [searchFromURL]);

  // Update URL and trigger search
  const handleSubmit = () => {
    navigate(`/?search=${encodeURIComponent(dish)}`);
  };

  return (
    <div>
      <h1>Search Recipes</h1>
      <input
        type="text"
        placeholder="Enter dish name"
        value={dish}
        onChange={(e) => setDish(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />
      <button onClick={handleSubmit}>Search</button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
        }}
      >
        {output.results.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() =>
              navigate(
                `/recipe/${recipe.id}?search=${encodeURIComponent(dish)}`
              )
            }
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "0.5rem",
            }}
          >
            <h3>{recipe.title}</h3>
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{ width: "100%" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
