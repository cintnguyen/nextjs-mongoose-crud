export default function RecipesList({ handleDelete, recipes, updateForm }) {
    return (
        <ul className="space-y-4">
            {recipes.map((recipe, i) => {
                return (
                    <li key={i}
                    className="p-4 rounded-md shadow-sm  transition-all">
                        <span className="p-4">{recipe.name}</span>
                        <span>{recipe.description}</span>
                        <button className="p-4" onClick={() => handleDelete(recipe._id)}>Delete</button>
                        {/* <button onClick={handleDelete()}>Delete</button> function CALL, which is not what we want */}
                        <button className="p-4" onClick={() => updateForm(recipe)}>Update</button>
                    </li>
                )
            })}
        </ul>
    )
}

