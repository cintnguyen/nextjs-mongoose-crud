'use client'
import Image from "next/image";
import { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const getRecipes = async () => {
      const res = await fetch('/api/recipes', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const recipes = await res.json()
      setRecipes(recipes)
      console.log("RECIPES", recipes)
    }
    getRecipes()
  }, []) // another thread of execution, it could finish whenever, so React gets the resp from them when it's ready. W/o useEffect it could finish and change the state

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(recipeName, description)
    const res = await fetch('/api/recipes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // model requires name, not recipeName
      // body: JSON.stringify({recipeName, description}),
      body: JSON.stringify({ name, description }),
    })

    const newRecipe = await res.json(); //turn into an object
    setRecipes(recipes => [...recipes, newRecipe])
    // const data = await res.json()
  }

  


  const handleDelete = async(id) => {
    const res = await fetch ( 'api/recipes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }
    )
    setRecipes(recipes => recipes.filter((recipe) => recipe._id !== id))
    console.log(id)
  }

  return (
    <main>
      <nav>
        <ul>
          <li>Homepage</li>
          <li>Manage Recipes</li>
        </ul>
      </nav>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Recipe Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="Submit">Add Recipe</button>
        </form>
      </section>
      <section>
        <ul>
          {recipes.map((recipe,i) => {
            return (
            <li key={i}>
              <span>{recipe.name}</span>
              <span>{recipe.description}</span>
              <button onClick={()=>handleDelete(recipe._id)}>Delete</button>
              {/* <button onClick={handleDelete()}>Delete</button> function CALL, which is not what we want */}
            </li>
            )
          })}
        </ul>
      </section>
    </main>

  );
}
