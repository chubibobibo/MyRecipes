import React from 'react';
import Col from 'react-bootstrap/Col';
import RecipeCard from './RecipeCard.jsx'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

//This component renders the cards to display the categories.
function IndexDisplay({ categories }) {
    return (
        <div>
            <Col key={categories._id} className='catRow'>
                {/* <RecipeCard newData={categories} /> */}
                <Card border={'secondary'}>
                    <Card.Img variant="top" src={`${categories.categoryImg}`} />
                    <Card.Body>
                        <Card.Title>{categories.categoryName}</Card.Title>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer.
                        </Card.Text>
                    </Card.Body>
                    <Link to={`/categories/${categories.categoryName}`} className='linkBtn'><Button>{categories.categoryName} Recipes</Button></Link>
                </Card>
            </Col>
        </div>
    )
}

export default IndexDisplay