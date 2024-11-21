export default function RecipesList({ handleDelete, recipes, updateForm }) {
    return (
        <ul>
            {recipes.map((recipe, i) => {
                return (
                    <li key={i}>
                        <span>{recipe.name}</span>
                        <span>{recipe.description}</span>
                        <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                        {/* <button onClick={handleDelete()}>Delete</button> function CALL, which is not what we want */}
                        <button onClick={() => updateForm(recipe)}>Update</button>
                    </li>
                )
            })}
        </ul>
    )
}

