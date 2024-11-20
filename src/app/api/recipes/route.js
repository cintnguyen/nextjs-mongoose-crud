import connectToDatabase from '../../lib/mongodb'
import Recipe from '../../models/Recipe'


/*
1. there were two api folders, one outside of app, one inside, it needs to be inside
2. we had code leftover using collection which is mongo but were switching to mongoose
3. we had recipeName and the fetch was also sending recipeName, but the Recipe model requires "name"
4. we were importing Recipes, should be Recipe from the models/Recipe, i renamed models/Recipes.js to Recipe.js because scheams are usually singular
5. needed to have Recipe.create() to create the new Recipe
*/
export async function POST(req) {
  await connectToDatabase(); // Connect to the database
  const { name, description } = await req.json();
  // const newRecipe = await Recipe.create({ name, description }); // better to keep as this or descrtucture it?
  const newRecipe = await Recipe.create({ name, description });
  console.log("new recipe", newRecipe)
  return new Response(JSON.stringify(newRecipe), { status: 201 });
}

export async function GET(req) {
  await connectToDatabase(); // Connect to the database
  const recipes = await Recipe.find();
  return new Response(JSON.stringify(recipes), { status: 200 });
  //whats the difference between status 200 and 201
}

export async function DELETE(req) {
  await connectToDatabase(); // Connect to the database
  const { id } = await req.json();
  const deletedRecipe = await Recipe.findByIdAndDelete(id)
  return new Response(JSON.stringify({ message: "Recipe deleted successfully" }), { status: 200 });
}

export async function PUT(req) {
  console.log("HELLOOOO")
  await connectToDatabase(); // Connect to the database
  const { id, updatingName, updatingDescription} = await req.json();
  console.log("UPDATE ID",id)
  const updatedRecipe = await Recipe.findByIdAndUpdate(id, { name: updatingName, description: updatingDescription}, { new: true })
  console.log("UPDATED STUFF",updatedRecipe)
  return new Response(JSON.stringify(updatedRecipe), { status: 200 });
}