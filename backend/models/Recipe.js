//models/Recipe.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
    {
        recipeName: {
            type: String,
            required: true
        },
        recipePhoto: {
            type: String,
            required: true
        },
        recipeIngredients: [
            {
                type: String,
                required: true
            }
        ],
        recipeInstruction: {
            type: String,
            required: true
        },
        cookingTime: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            enum: {
                values: ['Pork', 'Beef', 'Fish', 'Chicken', 'Vegetables']
            },
            default: "Pork"
        },
        description: {
            type: String,
            required: true
        }
    }
);

const RecipeModel = mongoose.model('RecipeModel', RecipeSchema);
export default RecipeModel;