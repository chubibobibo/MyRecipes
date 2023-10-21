import React from 'react';
import CatDisplay from './CatDisplay.jsx'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, { isCancel, AxiosError } from 'axios';
import Row from 'react-bootstrap/Row';

//This component contains the logic for the filtered recipes by category.
function Category() {
    const { specCategory } = useParams();
    const [allRecipes, setAllRecipes] = useState([]); //an array because we need to iterate.

    useEffect(() => {
        async function getRecipes() {
            const foundRecipes = await axios.get('http://localhost:3001/main/')
            setAllRecipes(foundRecipes.data.foundEntries)
            // console.log(foundRecipes.data.foundEntries)
        } getRecipes();
    }, []);

    const data = allRecipes.filter(newRecipe =>
        newRecipe.category === specCategory);
    // console.log(data)
    return (
        <div className='catCard'>
            <Row xs={1} md={2}>
                {data.map(newData =>
                    < CatDisplay newData={newData} key={newData._id} />
                )}
            </Row>
        </div>
    )
}

export default Category