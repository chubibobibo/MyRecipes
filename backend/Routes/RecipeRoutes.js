import express from 'express';
import RecipeModel from '../models/Recipe.js';
import UserModel from '../models/User.js';
import CategoryModel from '../models/Category.js';
import cloudinary from '../Cloudinary/index.js'
const Router = express.Router();

//get all recipes
Router.get('/', async (req, res) => {
    const foundEntries = await RecipeModel.find({});
    // console.log(foundEntries);
    res.json({ message: 'entries found', foundEntries })
});

//Creating a new recipe
//UPdATE: used the cloudinary API to uplaod a single photo
Router.post('/', async (req, res) => {
    // console.log(req.body)
    const { recipeName, recipePhoto, recipeIngredients, recipeInstruction, cookingTime, category, description } = req.body;
    try {
        if (recipePhoto) {
            //use clodinary upload API
            //response is an object
            //cloudianry returns a public_id and secure_url
            const response = await cloudinary.uploader.upload(recipePhoto, {
                upload_prest: "MyRecipes"
            })
            // console.log(response)
            // console.log(response.secure_url)
            if (response) {
                const newRecipe = new RecipeModel({
                    recipeName: recipeName,
                    recipePhoto: {
                        public_id: response.public_id,
                        url: response.secure_url
                    },
                    recipeIngredients: recipeIngredients,
                    recipeInstruction: recipeInstruction,
                    cookingTime: cookingTime,
                    category: category,
                    description: description
                });
                await newRecipe.save()
                res.json({ message: 'New recipe created', newRecipe })
            } else { console.log('no response from cloudinary') }
        } else { console.log('no photo uploaded') }
    } catch (err) {
        console.log(err)
    }
})

//get all categories
Router.get('/categories', async (req, res) => {
    const foundCategory = await CategoryModel.find({});
    // console.log(foundCategory);
    res.json({ message: 'categories available', foundCategory })
})
//displaying a specific recipe
Router.post('/recipe/:recipeId', async (req, res) => {
    // const { recipeId } = req.params
    // console.log(req.params)
    const { recipeId } = req.body;
    // console.log(recipeId)
    const foundRecipe = await RecipeModel.findById(recipeId)
    res.json({ message: 'recipe found', foundRecipe });
})

//saving a favorite recipe
Router.put('/save', async (req, res) => {
    //will come from a custom hook to get the userId from localStorage.
    //recipeID will come from a variable with useParams.
    const { userId, recipeId } = req.body;
    const foundUser = await UserModel.findById(userId);
    const foundRecipe = await RecipeModel.findById(recipeId);
    foundUser.favRecipe.push(foundRecipe.id);
    foundUser.save()
    console.log(foundUser.favRecipe)
    res.json({ message: 'favorite recipe', foundUser })
});

//Updating an existing recipe
//using patch because not all the data stored in the database will be changed.
Router.put('/recipe/recipeId/edit', async (req, res) => {
    // const { recipeId } = req.params
    const { recipeName, recipePhoto, recipeIngredients, recipeInstruction, cookingTime, category, description, recipeId } = req.body;
    // console.log(req.body)
    try {
        const foundRecipe = await RecipeModel.findByIdAndUpdate(recipeId, req.body, { runValidators: true, new: true });
        foundRecipe.save()
        // console.log(foundRecipe)
        res.json({ message: 'Recipe Updated', foundRecipe });
    } catch (err) {
        console.log(err)
    }

})

//New Update route using params
// Router.put('/recipe/recipeId', async (req, res) => {
//     // const { recipeId } = req.params;
//     console.log(req.params)
//     const { recipeName, recipePhoto, recipeIngredients, recipeInstruction, cookingTime, category, description, recipeId } = req.body;
//     console.log(req.body)
//     // look for the id in the RecipeModel
//     const foundRecipe = await RecipeModel.findById(recipeId);
//     if (!foundRecipe) {
//         res.status(400)
//         throw new Error('Recipe not found')
//     }
//     const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipeId, req.body, { new: true })
//     res.status(200).json({ message: 'Recipe Updated' }, updatedRecipe)
// })

//deleting an existing recipe
Router.post('/recipe/recipeId/delete', async (req, res) => {
    const { recipeId } = req.body;
    console.log(recipeId)
    const foundRecipe = await RecipeModel.findByIdAndDelete(recipeId);
    res.json({ message: 'Recipe Deleted' })
})




export { Router as RecipeRoutes }