import swaggerSetup from './swagger.ts';
import mongoose from "mongoose";
import express, {Express} from "express";
import dotenv from "dotenv";


const app: Express = express()


// Load environment variables from .env file
dotenv.config();


// to get connected to mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('### connected to MongoDB ###'))
    .catch(err => console.error(err))

// Swagger Setup
swaggerSetup(app);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));