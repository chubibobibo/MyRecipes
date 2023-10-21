import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        categoryName: {
            type: String,
        },
        categoryImg: {
            type: String,
        }
    }
);

const CategoryModel = mongoose.model('CategoryModel', CategorySchema);
export default CategoryModel;



