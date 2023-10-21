//models/User.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        favRecipe: [
            {
                type: Schema.Types.ObjectId,
                ref: 'RecipeModel'
            }
        ]
    }
);

const UserModel = new mongoose.model('UserModel', UserSchema);
export default UserModel;