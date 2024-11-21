'use client'
import Image from "next/image";
import { useState, useEffect } from 'react';
import RecipesList from './RecipesList'
import Link from "next/link";


export default function Home() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [recipes, setRecipes] = useState([])
  const [updating, setUpdating] = useState(null)
  const [updatingName, setUpdatingName] = useState("")
  const [updatingDescription, setUpdatingDescription] = useState("")
  const [search, setSearch] = useState("")
  console.log(updating)

  useEffect(() => {
    const getRecipes = async () => {
      const res = await fetch('/api/recipes?search='+search, {
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
    try {
      const res = await fetch('/api/recipes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      })
      if (res.status >= 400){
        throw new Error("bad status:"+res.status)
      }
      const newRecipe = await res.json(); //turn into an object
      setRecipes(recipes => [...recipes, newRecipe])

      setName("")
      setDescription("")
      // const data = await res.json()
    }catch (error){
      console.log("Error Message:", error)
    }   
  }




  const handleDelete = async (id) => {
    const res = await fetch('api/recipes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }
    )
    console.log("DEL RES", res)
    if (res.status === 200) {
      setRecipes(recipes => recipes.filter((recipe) => recipe._id !== id))
    }
    console.log(id)
  }

  const updateForm = async (recipeToUpdate) => {
    setUpdatingName(recipeToUpdate.name)
    setUpdatingDescription(recipeToUpdate.description)
    setUpdating(recipeToUpdate)
  }

  const handleUpdate = async(e) => {
    e.preventDefault()
    const res = await fetch ( 'api/recipes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id : updating._id, updatingName, updatingDescription }),
    }
    )
    if (res.status === 200){
      const updatedRecipe = await res.json()
      setRecipes(recipes => {
        const indexOfRecipe = recipes.findIndex(recipe => recipe._id === updatedRecipe._id)
        recipes.splice(indexOfRecipe, 1, updatedRecipe)
        return [...recipes]
      })
      setUpdating(null)
    }
    console.log("UPDATING RES", res)
  }

  return (
    <main>
      <nav>
        <ul>
          <li><Link href="/about">About</Link></li>
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
        <input
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <RecipesList handleDelete={handleDelete} recipes={recipes} updateForm={updateForm}/>
      </section>
      {updating ?
        (<section>
          <form onSubmit={handleUpdate}>
          <input
            placeholder="Recipe Name"
            type="text"
            value={updatingName}
            onChange={(e) => setUpdatingName(e.target.value)}
          ></input>
          <textarea
            placeholder="Description"
            value={updatingDescription}
            onChange={(e) => setUpdatingDescription(e.target.value)}
          ></textarea>
          <button type="Submit">Update</button>
        </form>
        </section>) :
        null
      }

    </main>
  );
}
