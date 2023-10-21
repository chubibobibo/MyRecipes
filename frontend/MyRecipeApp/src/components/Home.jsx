import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios, { isCancel, AxiosError } from 'axios';
import HomeDisplay from './HomeDisplay.jsx';
import Row from 'react-bootstrap/Row';

//This component contains logic for the list of all recipes
function Home() {
    //state for managing all the recipes
    const [allRecipes, setAllRecipes] = useState([]);
    useEffect(() => {
        async function getRecipes() {
            const allRecipe = await axios.get('http://localhost:3001/main');
            // console.log(allRecipe)
            // setAllRecipes(oldRecipe => {
            //     return [...oldRecipe, allRecipe]
            setAllRecipes(allRecipe.data.foundEntries)
        } getRecipes()
    }, [])
    console.log(allRecipes)
    return (
        <div className='catCard'>
            <Row xs={1} md={2}>
                {allRecipes.map(recipes =>
                    <HomeDisplay recipes={recipes} key={recipes._id} />
                )}
            </Row>
        </div>
    )
}

export default Home 