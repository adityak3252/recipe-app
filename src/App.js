import React, {useEffect, useState} from "react";
import './App.css';
import Recipe from "./recipe";

const App = () => {

  const APP_ID = "84819849";
  const APP_KEY = "3c6a3bc7f86468189850c70232815a89";

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState("paneer");

  useEffect(() => {
    getRecipes();
  }, [query]);
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}></input>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipe">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.calories}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))};
      </div>
    </div>
  );
}

export default App;
