import React from 'react';
import RecipeCard from './RecipeCard.jsx';
import { useState, useEffect } from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import SpecRecipeDisplay from './SpecRecipeDisplay.jsx'


function SpecRecipe() {
    const { recipeId } = useParams();
    const [recipeData, setRecipeData] = useState({});

    // console.log(useParams)
    useEffect(() => {
        async function getData() {
            const data = await axios.post('http://localhost:3001/main/recipe/recipeId', { recipeId });
            setRecipeData(data.data.foundRecipe)
        } getData()
    }, [])
    console.log(recipeData)
    return (
        <div>
            <SpecRecipeDisplay newData={recipeData} />
        </div>
    )
}

export default SpecRecipe