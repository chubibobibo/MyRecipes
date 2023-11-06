import React from 'react';
import RecipeCard from './RecipeCard.jsx';
import { useState, useEffect } from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import SpecRecipeDisplay from './SpecRecipeDisplay.jsx';
import Card from 'react-bootstrap/Card';


function SpecRecipe() {
    const { recipeId } = useParams();
    const [recipeData, setRecipeData] = useState({});
    const [photoData, setPhotoData] = useState({ public_id: '', url: '' });

    // console.log(useParams)
    useEffect(() => {
        async function getData() {
            const data = await axios.post('http://localhost:3001/main/recipe/recipeId', { recipeId });
            // console.log(data.data.foundRecipe.recipePhoto.url)
            setRecipeData(data.data.foundRecipe)
            setPhotoData(data.data.foundRecipe.recipePhoto)
        } getData()
    }, [])
    // console.log(recipeData)
    return (
        <div>
            <SpecRecipeDisplay newData={recipeData} photoData={photoData} recipeId={recipeId} />
        </div>
    )
}
export default SpecRecipe
