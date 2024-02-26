import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios, { isCancel, AxiosError } from 'axios';
import HomeDisplay from './HomeDisplay.jsx';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

//This component contains logic for the list of all recipes
function Home() {
    //state for managing all the recipes
    const [allRecipes, setAllRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        async function getRecipes() {
            setIsLoading(true)
            const allRecipe = await axios.get('http://localhost:3001/main');
            // console.log(allRecipe)
            // setAllRecipes(oldRecipe => {
            //     return [...oldRecipe, allRecipe]
            if (!allRecipe) {

                setIsLoading(false)
            } else {
                setAllRecipes(allRecipe.data.foundEntries)
                setIsLoading(false)
            }
        } getRecipes()
    }, [])
    console.log(allRecipes)
    return (
        <div className='catCard'>
            {allRecipes == 0 ? <><Spinner
                as="span"
                animation="grow"
                // size="xl"
                role="status"
                aria-hidden="true"
            />
                <h1>No Recipes</h1></> :
                <Row xs={1} md={2}>
                    {allRecipes.map(recipes =>
                        <HomeDisplay recipes={recipes} key={recipes._id} />
                    )}
                </Row>
            }
        </div >
    )
}

export default Home 