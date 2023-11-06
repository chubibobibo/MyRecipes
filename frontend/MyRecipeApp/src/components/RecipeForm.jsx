import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';

//passed the state from the aprent component to be used as the value of the input form
function RecipeForm({ handleChange, recipeData }) {
    //state to manage the number of ingredients in an array.
    //this state will be used in adding an empty item in an array for rendering a new input field.
    const [ingredient, setIngredient] = useState([''])
    console.log(recipeData)
    const handleClick = () => {
        setIngredient(recipeIngredients => {
            return [...recipeIngredients, '']
        })
    };

    // function to handle the changes in the ingredient
    const handleChangeIngredient = (e, idx) => {
        //assign each iteration of the ingredient the value of the target input field
        ingredient[idx] = e.target.value
        setIngredient(ingredient)
    };

    return (
        <div className='recipeFormContainer'>
            <Card className='recipeFormCard' border={'secondary'}>
                <Card.Body >
                    <Card.Title>Create New Recipe</Card.Title>
                    <Form>
                        {/* recipe name */}
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control name="recipeName" value={recipeData.recipeName} type="text" placeholder="Recipe Name" onChange={handleChange} />
                        </Form.Group>
                        {/* recipe photo */}
                        <Form.Group className="mb-3" controlId="formGroupPhoto">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control name="recipePhoto" type="file" placeholder="Password" value={recipeData.recipePhoto} />
                        </Form.Group>
                        {/* recipe ingredients */}
                        <Form.Group className="mb-3" controlId="formGroupIngredients">
                            <Form.Label>Ingredients</Form.Label>
                            {/* {ingredient.map((newIngredient, idx) => (
                                <Form.Control name="recipeIngredients" type="text" placeholder="Ingredients" value={newIngredient[idx]} onChange={handleChange} key={idx} />
                            ))} */}
                            {ingredient.map((newIngredient, idx) => (
                                <Form.Control name="recipeIngredients" type="text" placeholder="Ingredients" value={newIngredient} onChange={handleChangeIngredient} key={idx} />
                            ))}
                            <Button variant='primary' onClick={handleClick}>Add Ingredient</Button>
                        </Form.Group>
                        {/* recipe instructions */}
                        <Form.Group className="mb-3" controlId="formGroupInstructions">
                            <Form.Label>Instructions</Form.Label>
                            <Form.Control name="recipeInstruction" as="textarea" placeholder="Instructions" value={recipeData.recipeInstruction} onChange={handleChange} />
                        </Form.Group>
                        {/* cooking time */}
                        <Form.Group className="mb-3" controlId="formGroupCookingtime">
                            <Form.Label>Cooking Time</Form.Label>
                            <Form.Control name="cookingTime" type="number" placeholder="Cooking Time" value={recipeData.cookingTime} onChange={handleChange} />
                        </Form.Group>
                        {/* category */}
                        <Form.Group controlId="formGroupCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" name='category' onChange={handleChange}>
                                <option>Select Category</option>
                                <option value="Pork">Pork</option>
                                <option value="Beef">Beef</option>
                                <option value="Fish">Fish</option>
                                <option value="Chicken">Chicken</option>
                                <option value="Vegetables">Vegetables</option>
                            </Form.Select>
                        </Form.Group>
                        {/* description */}
                        <Form.Group className="mb-3" controlId="formGroupDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Description" name='description' value={recipeData.description} onChange={handleChange} />
                        </Form.Group>
                        {/* button */}
                        <Button variant="primary" type='submit'>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <p>{recipeData.category}</p>
        </div>
    )
}

export default RecipeForm