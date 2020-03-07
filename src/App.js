// eslint-disable-next-line

import React, {useEffect, useState} from "react";
import "./App.css";
import Recipe from "./Sabji.js";


const App = () => {

  const APP_ID = "";   //  Go to the EDAMAM site create ur own App.ID & App.KEY
  const APP_KEY = "";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('Chicken');

  useEffect(()=>{
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
       );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    

    //fetch('`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}')
    //  .then(response => response.json())
    //  .then(jsondata => console.log(jsondata))
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button"  type="submit">Search</button>
      </form>
      {recipes.map(recipe => (
        <Recipe 
            key = {recipe.recipe.label}
            title = {recipe.recipe.label}
            calories = {Math.floor(recipe.recipe.calories)}         //Number((6.688689).toFixed(1));
            image = {recipe.recipe.image}
            ingredients = {recipe.recipe.ingredients}
        />
      ))}
    </div>
  );

};

export default App;