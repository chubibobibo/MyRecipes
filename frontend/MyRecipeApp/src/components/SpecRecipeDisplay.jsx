import React from 'react';
import Card from 'react-bootstrap/Card';

function SpecRecipeDisplay({ newData }) {
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
                </Card.Body>
            </Card>
        </div>
    )
}

export default SpecRecipeDisplay