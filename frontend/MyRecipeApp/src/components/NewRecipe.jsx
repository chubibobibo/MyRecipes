import React from 'react';
import { useState } from 'react';
import RecipeForm from './RecipeForm.jsx'

function NewRecipe() {
    //state to manage the data from form
    const [recipeData, setRecipeData] = useState({ recipeName: '', recipePhoto: '', recipeIngredients: [], recipeInstruction: '', cookingTime: '', category: '', description: '' });
    const handleChange = (e) => {
        setRecipeData(oldData => {
            return { ...oldData, [e.target.name]: e.target.value }
        })
    }
    return (
        <div>
            <RecipeForm handleChange={handleChange} recipeData={recipeData} />
        </div>
    )
}

export default NewRecipe