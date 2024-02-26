import React from 'react';
import { useState, useEffect } from 'react';
import RecipeForm from './RecipeForm.jsx';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios, { isCancel, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';


function UpdateRecipe() {
    const navigate = useNavigate()
    //obtaining the recipeId from the url path with params.
    const { recipeId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    //state  for handling the recipeData
    //this will be contain the data that will be returned from calling an API to return all recipes
    const [newRecipeData, setNewRecipeData] = useState({ recipeName: '', recipePhoto: '', recipeIngredients: [{ ingredientName: '', qty: '' }], recipeInstruction: '', cookingTime: '', category: '', description: '' });

    //state for managing the changes in input.
    const handleChange = (e) => {
        setNewRecipeData(oldData => {
            return { ...oldData, [e.target.name]: e.target.value }
        })
    };
    //managing the changes in the photo upload form
    //we need to transform the file from the input to base64 to be used ion submission to cloudinary
    const transformFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => { //executes after reading
            const result = reader.result//saving the result of the readAsDataURL
            setNewRecipeData(oldData => {
                return { ...oldData, recipePhoto: result }
            })
        }
    };
    //state that will use transform file to manage the input of photo
    const handlePhotoChange = (e) => {
        const photoFile = e.target.files[0]//we use e.target.file because it is sent by the file input form for the photo. This will get converted into base64. Saved it to a variable because this file is an array. I only need the first item!.
        console.log(recipeData.recipePhoto)
        transformFile(photoFile);
    };

    //managing the input for ingredients
    const handleIngredientChange = (e, idx) => {
        //because recipeIngredients is an array we need to access each one using idx.
        //first we need to save it to a variable so I can use idx and give it the value of the target.
        const ingredientData = newRecipeData.recipeIngredients;
        ingredientData[idx].ingredientName = e.target.value
        //setState returning oldData then we would want to change the oldData.recipeIngredient which is an array with the value of the ingredientData.ingredientName (which is an object that has the value of the input field)
        setRecipeData(oldData => {
            return { ...oldData, [oldData.recipeIngredients]: { ingredientName: ingredientData.inbgredientName } }
        })
    };

    //managing the qty in the recipeIngredient
    const handleQtyChange = (e, idx) => {
        const qtyData = newRecipeData.recipeIngredients;
        qtyData[idx].qty = e.target.value;
        setNewRecipeData(oldData => {
            return { ...oldData, [oldData.recipeIngredients]: { qty: qtyData.qty } }
        })
    };

    //managing the submission of the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(newRecipeData)
            setIsLoading(true)
            const result = await axios.put('http://localhost:3001/main/recipe/recipeId/edit', { newRecipeData, recipeId });
            navigate('/');
            alert('Recipe Updated');
            setIsLoading(false)
            // console.log(result)
        } catch (err) {
            console.log(err)
        }
    };
    // console.log(newRecipeData)

    //obtaining all the recipe data using useEffect hook.
    //this will be used as the value of the recipeData state.
    useEffect(() => {
        async function getAllRecipes() {
            const allRecipes = await axios.post('http://localhost:3001/main/recipe/recipeId', { recipeId });
            // console.log(allRecipes)
            const data = allRecipes.data.foundRecipe;
            // console.log(data)
            // setRecipeData(oldData => {
            //     return { ...oldData, recipeName: data.recipeName, recipePhoto: data.recipePhoto, recipeIngredients: [{ ingredientName: data.recipeIngredient.ingredientName, qty: data.recipeIngredient.qty }], recipeInstruction: data.recipeInstruction, cookingTime: data.cookingTime, category: data.category, description: data.descritption };
            // })
            setNewRecipeData(data)
        } getAllRecipes()
    }, [])
    // console.log(recipeData)
    return (
        <div className='recipeFormContainer'>
            {/* <RecipeForm handleChange={handleChange} recipeData={recipeData} /> */}
            <Card className='recipeFormCard' border={'secondary'}>
                <Card.Body >
                    <Card.Title>Edit Recipe</Card.Title>
                    <Form encType="multipart / form-data" onSubmit={handleSubmit}>
                        {/* recipe name */}
                        <Form.Group className="mb-3" controlId="formGroupName" >
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control name="recipeName" type="text" placeholder="Recipe Name" value={newRecipeData.recipeName} onChange={handleChange} />
                        </Form.Group>
                        {/* recipe photo */}
                        <Form.Group className="mb-3" controlId="formGroupPhoto">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="file" placeholder="Photo" accept="image/png, image/jpeg, image/jpg" onChange={handlePhotoChange} />
                        </Form.Group>
                        {/* recipe ingredients */}
                        {newRecipeData.recipeIngredients.map((newIngredient, idx) =>
                            <Form.Group className="mb-3" controlId={idx} key={idx}>
                                <Form.Label>{`Ingredient ${idx + 1}`}</Form.Label>
                                <Form.Control name="recipeIngredients" type="text" placeholder="Ingredients" value={newIngredient.ingredientName} onChange={handleIngredientChange} />
                                {/* QTY */}
                                <Form.Label>{`Quantity ${idx + 1}`}</Form.Label>
                                <Form.Control name="recipeQty" type="text" placeholder="Quantity" value={newIngredient.qty} onChange={handleQtyChange} />
                            </Form.Group>
                        )}
                        <Button variant='primary'>Add Ingredient</Button>
                        {/* recipe instructions */}
                        <Form.Group className="mb-3" controlId="formGroupInstructions">
                            <Form.Label>Instructions</Form.Label>
                            <Form.Control name="recipeInstruction" as="textarea" placeholder="Instructions" value={newRecipeData.recipeInstruction} onChange={handleChange} />
                        </Form.Group>
                        {/* cooking time */}
                        <Form.Group className="mb-3" controlId="formGroupCookingtime">
                            <Form.Label>Cooking Time</Form.Label>
                            <Form.Control name="cookingTime" type="number" placeholder="Cooking Time" value={newRecipeData.cookingTime} onChange={handleChange} />
                        </Form.Group>
                        {/* category */}
                        <Form.Group controlId="formGroupCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" name='category' value={newRecipeData.category} onChange={handleChange}>
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
                            <Form.Control as="textarea" placeholder="Description" name='description' value={newRecipeData.description} onChange={handleChange} />
                        </Form.Group>
                        {/* button */}
                        {isLoading === true ?
                            <><Button variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                            </Button></> : <Button variant="primary" type='submit'>Submit</Button>
                        }
                    </Form>
                </Card.Body>
            </Card>
            <p>{newRecipeData.recipeName}</p>
        </div>
    )
}

export default UpdateRecipe