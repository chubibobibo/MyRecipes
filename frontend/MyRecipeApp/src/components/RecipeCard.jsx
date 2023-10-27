import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


//This component contains a card for a recipe
function RecipeCard({ newData }) {
    return (
        <div>
            <Card border={'secondary'}>
                <Card.Img variant="top" src={newData.recipePhoto.url} />
                <Card.Body>
                    <Card.Title>{newData.recipeName}</Card.Title>
                    <Card.Text>
                        {newData.description}
                    </Card.Text>
                    <Card.Text>
                        <small className="text-muted">Cooking Time: {newData.cookingTime} minutes</small>
                    </Card.Text>
                    <Link to={`/recipe/${newData._id}`}><Button>Show Recipe</Button></Link>
                </Card.Body>
            </Card>

        </div>
    )
}

export default RecipeCard