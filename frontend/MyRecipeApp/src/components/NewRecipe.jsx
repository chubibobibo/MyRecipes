import React from 'react';
import { useState } from 'react';
import RecipeForm from './RecipeForm.jsx';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios, { isCancel, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


function NewRecipe() {
    const navigate = useNavigate();
    //state to manage the data from form
    const [recipeData, setRecipeData] = useState({ recipeName: '', recipePhoto: '', recipeIngredients: [{ ingredientName: '', qty: '' }], recipeInstruction: '', cookingTime: '', category: '', description: '' });

    //state to manage loading status.
    const [isLoading, setIsLoading] = useState(false);

    //state to manage the file(photo) sent by the form
    const [fileData, setFileData] = useState('');

    //function to transform the object from e.target.files to base64.
    const transformFile = (file) => {
        const reader = new FileReader()//transforms the object into base64(url).
        if (file) {
            reader.readAsDataURL(file);//transforming the object
            reader.onloadend = () => {//event fired when done reading the file
                const result = reader.result//converted image file to base64
                // setFileData(result);
                setRecipeData(oldData => {
                    return { ...oldData, recipePhoto: result }
                })
            }
        } else {
            setFileData('')
        }
    }
    // console.log(fileData)
    //handling changes in the input for photo
    const handlePhotoChange = (e) => {
        const imgFile = e.target.files[0]//an array of objects that came from the input for uploading a photo. This file needs to be transformed into base64.
        transformFile(imgFile)
    }
    // console.log(recipeData)//check the returned data so we can specify the data that we just need and set it as the value of the state

    //managing the changes in the input field
    const handleChange = (e) => {
        setRecipeData(oldData => {
            return { ...oldData, [e.target.name]: e.target.value }
        })
    }
    //function to add input fields when clicking.
    const handleClick = () => {
        setRecipeData(oldData => {
            //we wnat to change the the recipeIngredients property from the copied array ( oldData) with the value of the all the previous oldData.recipeIngredients and an empty string.]
            // console.log(oldData)
            return { ...oldData, recipeIngredients: [...oldData.recipeIngredients, { ingredientName: '', qty: '' }] }
        })
    };

    //managing the changes in the ingredient input.
    const handleChangeIngredient = (e, idx) => {
        //save recipe.recipeIngredients to a varibale so that we can obtain it's index using the idx that we passed as parameter.
        const ingredientInput = recipeData.recipeIngredients;
        // console.log(ingredientInput)
        ingredientInput[idx].ingredientName = e.target.value;
        //same pattern for handling changes of inputs, this time will be setting the value of the array oldData.recipeIngredients as an object that contains ingredientName having the value of ingredientInput(specific input field using idx)
        setRecipeData(oldData => {
            return {
                ...oldData, [oldData.recipeIngredients]: { ingredientName: ingredientInput.ingredientName }
            }
        });
        // console.log(recipeData)
    };

    //managing the value of the qty input field.
    const handleChangeQty = (e, idx) => {
        //saving the recipeIngredients in a vaiable so that I can use idx to specify the proper input field.
        const qtyInput = recipeData.recipeIngredients;
        //assigning the value of the targeted input field to the specific input.
        qtyInput[idx].qty = e.target.value;
        setRecipeData(oldData => {
            return { ...oldData, [oldData.recipeIngredients]: { qty: qtyInput.qty } }
        })
        // console.log(recipeData)
    }

    //manage the submission of the form.
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(recipeData)
        try {
            setIsLoading(true)
            await axios.post('http://localhost:3001/main/', recipeData);
            // console.log(result)
            setRecipeData({ recipeName: '', recipePhoto: '', recipeIngredients: [{}], recipeInstruction: '', cookingTime: '', category: '', description: '' })
            navigate('/')
            alert('New Recipe Created')
            // console.log(recipeData)
            setIsLoading(false)
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
                    <Form onSubmit={handleSubmit} encType="multipart / form-data" >
                        {/* recipe name */}
                        <Form.Group className="mb-3" controlId="formGroupName" >
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control name="recipeName" value={recipeData.recipeName} type="text" placeholder="Recipe Name" onChange={handleChange} />
                        </Form.Group>
                        {/* recipe photo */}
                        <Form.Group className="mb-3" controlId="formGroupPhoto">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="file" placeholder="Photo" onChange={handlePhotoChange} accept="image/png, image/jpeg, image/jpg" />
                        </Form.Group>
                        {/* recipe ingredients */}
                        {recipeData.recipeIngredients.map((newIngredient, idx) =>
                            <Form.Group className="mb-3" controlId={idx} key={idx}>
                                <Form.Label>{`Ingredient ${idx + 1}`}</Form.Label>
                                <Form.Control name="recipeIngredients" type="text" placeholder="Ingredients" value={newIngredient.ingredientName} onChange={(e) => handleChangeIngredient(e, idx)} />
                                <Form.Control name="recipeQty" type="text" placeholder="Quantity" value={newIngredient.qty} onChange={(e) => handleChangeQty(e, idx)} />
                            </Form.Group>
                        )}
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
        </div>
    )
}

export default NewRecipe