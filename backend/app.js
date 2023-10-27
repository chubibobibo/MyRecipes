import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { UserRoutes } from './Routes/UserRoutes.js';
import { RecipeRoutes } from './Routes/RecipeRoutes.js';
import multer from 'multer';
//import the configured storage that we created for cloudinary
// import storage from './Cloudinary/index.js';

const app = express();
//save into a variable the data parsed by multer from the forms and store it in the storage I configured in cloudinary (storage)

//middlewares
app.use(cors()); //communication between front and backend.
app.use(express.json({ limit: '20mb' })); //parsing of forms from frontend to json objects (req.body).
app.use('/user', UserRoutes)
app.use('/main', RecipeRoutes)

//connect to mongoose database
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGODBURI);
}


app.listen(process.env.PORT, () => {
    console.log(`SERVING PORT ${process.env.PORT}`)
})

