import connectToDatabase from '../../lib/mongodb'
import Recipe from '../../models/Recipe'


export async function POST(req) {
  try {
    await connectToDatabase(); // Connect to the database
    const { name, description } = await req.json();
   
    if (!name || !description) {
      return new Response(JSON.stringify({ error: "Name and description are required" }), { status: 400 });
    }

    const newRecipe = await Recipe.create({ name, description });
    console.log("new recipe", newRecipe)


    return new Response(JSON.stringify(newRecipe), { status: 201 });

  }catch(error){
    console.error("Error creating recipe:", error);

    // Return a 500 status for server errors
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred", details: error.message }),
      { status: 500 }
    );
  }
}

const searchCache = new Map ()

export async function GET(req) {
  await connectToDatabase(); // Connect to the database
  // const recipes = await Recipe.find();

  let recipes

  const searchParams = req.nextUrl.searchParams
  const search = searchParams.get('search')
  console.log("SEARCH", search)
 
  if (search) {
    // Filter recipes based on the 'search' parameter (e.g., case-insensitive search by name)
    if (searchCache.has(search)){
      recipes = searchCache.get(search)
      console.log("cache hit")
    }else{
      recipes = await Recipe.find({ name: { $regex: search, $options: 'i' } });
      searchCache.set(search, recipes)
      console.log("cache miss")
    }
  } else {
    // Return all recipes if no 'search' parameter is provided
    recipes = await Recipe.find();
  }
  return new Response(JSON.stringify(recipes), { status: 200 });

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