import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import RecipeCard from './RecipeCard.jsx'

//This component renders the list of all recipes.
function HomeDisplay({ recipes, key }) {
    console.log(recipes, key)
    return (
        <div>
            <Col key={key} className='catRow'>
                {recipes ?
                    <RecipeCard newData={recipes} /> : <h1>No recipes</h1>
                }
            </Col>
        </div >
    )
}

export default HomeDisplay