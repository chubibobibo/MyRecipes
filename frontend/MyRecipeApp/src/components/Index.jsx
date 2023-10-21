import React from 'react';
import IndexDisplay from './IndexDisplay.jsx';
import { useState, useEffect } from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import Row from 'react-bootstrap/Row';

//This component contains the logic for the page of category
function Index() {
    const [recipeId, setRecipeId] = useState([]);
    //obtain all recipes
    useEffect(() => {
        async function getRecipeId() {
            const foundRecipe = await axios.get('http://localhost:3001/main/categories');
            console.log(foundRecipe.data.foundCategory)
            setRecipeId(foundRecipe.data.foundCategory)
        } getRecipeId();
        // console.log(recipeId)
    }, [])

    return (
        <div className='catCard'>
            <Row xs={1} md={2} >
                {recipeId.map(categories =>
                    <IndexDisplay categories={categories} key={categories._id} />
                )}
            </Row>

        </div>
    )
}

export default Index