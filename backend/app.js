import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { UserRoutes } from './Routes/UserRoutes.js';
import { RecipeRoutes } from './Routes/RecipeRoutes.js';

const app = express();

//middlewares
app.use(cors()); //communication between front and backend.
app.use(express.json()); //parsing of forms from frontend to json objects (req.body).
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

