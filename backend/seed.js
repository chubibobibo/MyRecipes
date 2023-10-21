import mongoose from 'mongoose';
import CategoryModel from './models/Category.js';
import dotenv from 'dotenv'
dotenv.config()

//connect to mongoose database
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGODBURI);
}



//inserting data to model
const CategoryInstance = [
    {
        categoryName: 'Beef',
        categoryImg: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RlYWt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
        categoryName: 'Pork',
        categoryImg: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9yayUyMGNob3BzfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60'
    },
    {
        categoryName: 'Fish',
        categoryImg: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZpc2glMjBtZW51fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60'
    },
    {
        categoryName: 'Chicken',
        categoryImg: 'https://images.unsplash.com/photo-1588464083059-8c94f329b713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNoaWNrZW4lMjB3aW5nc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
        categoryName: 'Vegetables',
        categoryImg: 'https://images.unsplash.com/photo-1644504439611-ddc302de87ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZlZ2V0YWJsZSUyMG1lbnV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60'
    },
]

CategoryModel.insertMany(CategoryInstance).then(data => { console.log(data) }).catch(err => {
    console.log(err)
})