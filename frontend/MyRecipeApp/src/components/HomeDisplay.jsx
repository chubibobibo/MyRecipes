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
                <RecipeCard newData={recipes} />
                {/* <Card  >
                    <Card.Img variant="top" src={recipes.recipePhoto} />
                    <Card.Body>
                        <Card.Title>{recipes.recipeName}</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in
                            to additional content. This content is a little bit longer.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card> */}
            </Col>
        </div >
    )
}

export default HomeDisplay