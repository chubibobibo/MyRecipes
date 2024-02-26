import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios, { isCancel, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';



function SpecRecipeDisplay({ newData, photoData, recipeId }) {
    // console.log(newData.recipeIngredients)
    // const ingredients = newData.recipeIngredients
    const navigate = useNavigate()
    const handleClick = async () => {
        await axios.post('http://localhost:3001/main/recipe/recipeId/delete', { recipeId });
        navigate('/')
        alert('recipe Deleted')
    }
    return (
        <div className='specCardContainer'>
            {photoData ? <>
                <Card border={'secondary'} className='specCard'>
                    {/* <Card.Img variant="top" src={newData.url} /> */}
                    <Card.Img variant="top" src={photoData.url} />
                    <Card.Body>
                        <Card.Title>{newData.recipeName}</Card.Title>
                        <Card.Text>
                            {newData.description}
                        </Card.Text>
                        <Card.Text>
                            <small className="text-muted">Cooking Time: {newData.cookingTime} minutes</small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title>
                            Ingredients:
                        </Card.Title>
                        <Card.Text>
                            <ListGroup as="ol">
                                {newData.recipeIngredients?.map((allIngredients) =>
                                    (<ListGroup.Item as="li" key={allIngredients._id}><b>Ingredient Name: </b>{allIngredients.ingredientName} <br /> <b>Qty: </b>{allIngredients.qty}</ListGroup.Item>))
                                }
                            </ListGroup>
                        </Card.Text>
                        <Card.Title>
                            Instructions:
                        </Card.Title>
                        <Card.Text>
                            {newData.recipeInstruction}
                        </Card.Text>
                    </Card.Body>
                    <Link to={`/recipe/${recipeId}/edit`}><Button variant='warning' className='editBtn'>Edit Recipe</Button></Link>
                    <Button className='editBtn' variant="danger" onClick={handleClick}>Delete Recipe</Button>
                </Card>
            </> : <h1>Loading</h1>
            }
        </div >
    )
}
export default SpecRecipeDisplay