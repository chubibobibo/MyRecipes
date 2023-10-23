import React from 'react';
import { useState } from 'react';
import RecipeForm from './RecipeForm.jsx';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios, { isCancel, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';


function NewRecipe() {
    const navigate = useNavigate();
    //state to manage the data from form
    const [recipeData, setRecipeData] = useState({ recipeName: '', recipePhoto: '', recipeIngredients: [''], recipeInstruction: '', cookingTime: '', category: '', description: '' });
    //managing the changes in the input field
    const handleChange = (e) => {
        setRecipeData(oldData => {
            return { ...oldData, [e.target.name]: e.target.value }
        })
    }
    //function to add input fields when clicking.
    const handleClick = () => {
        setRecipeData(oldData => {
            //we wnat to change the the recipeIngredients property from the copied array ( oldData) with the value of the all the previous oldData.recipeIngredients and an empty string.
            return { ...oldData, recipeIngredients: [...oldData.recipeIngredients, ''] }
        })
    };

    //managing the changes in the ingredient input.
    const handleChangeIngredient = (e, idx) => {
        //save recipe.recipeIngredients to a varibale so that we can obtain it's index using the idx taht we passed as parameter.
        const ingredientInput = recipeData.recipeIngredients;
        ingredientInput[idx] = e.target.value;
        setRecipeData(oldData => {
            return { ...oldData, recipeIngredients: ingredientInput }
        })
        console.log(recipeData)
    }

    //manage the submission of the form.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3001/main/', recipeData);
            console.log(result)
            setRecipeData({ recipeName: '', recipePhoto: '', recipeIngredients: [''], recipeInstruction: '', cookingTime: '', category: '', description: '' })
            console.log(result)
            navigate('/')
            alert('New Recipe Created')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='recipeFormContainer'>
            {/* <RecipeForm handleChange={handleChange} recipeData={recipeData} /> */}
            <Card className='recipeFormCard' border={'secondary'}>
                <Card.Body >
                    <Card.Title>Create New Recipe</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        {/* recipe name */}
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control name="recipeName" value={recipeData.recipeName} type="text" placeholder="Recipe Name" onChange={handleChange} />
                        </Form.Group>
                        {/* recipe photo */}
                        <Form.Group className="mb-3" controlId="formGroupPhoto">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control name="recipePhoto" type="text" placeholder="Password" value={recipeData.recipePhoto} onChange={handleChange} />
                        </Form.Group>
                        {/* recipe ingredients */}
                        {recipeData.recipeIngredients.map((newIngredient, idx) => (
                            <Form.Group className="mb-3" controlId={idx} key={idx}>
                                <Form.Label>{`Ingredient ${idx + 1}`}</Form.Label>
                                <Form.Control name="recipeIngredients" type="text" placeholder="Ingredients" value={newIngredient} onChange={(e) => handleChangeIngredient(e, idx)} />
                            </Form.Group>
                        ))}
                        <Button variant='primary' onClick={handleClick}>Add Ingredient</Button>
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

export default NewRecipe