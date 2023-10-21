import React from 'react';
import Col from 'react-bootstrap/Col';
import RecipeCard from './RecipeCard.jsx'

//This component renders the cards that dispalys filtered recipes by category.
function CatDisplay({ newData }) {
    return (
        <div key={newData._id}>
            <Col>
                <RecipeCard newData={newData} />
            </Col>
        </div>
    )
}

export default CatDisplay