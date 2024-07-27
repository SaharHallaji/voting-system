import mongoose from "mongoose";
import express, {Express} from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.ts";
import {errorHandler} from "./middlewares/errorHandler.middleware.ts";
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './config/swagger.ts';
import planRoute from "./routes/plan.route.ts";
import voteRoute from "@/routes/vote.route.ts";
import resultRoute from "@/routes/result.route.ts";



const app: Express = express()
app.use(bodyParser.json());

// Load environment variables from .env file
dotenv.config();


// to get connected to mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('### connected to MongoDB ###'))
    .catch(err => console.error(err))

// Swagger setup
const swaggerDocs = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// Routes
app.use('/api', authRoute);
app.use('/api', planRoute);
app.use('/api', voteRoute);
app.use('/api', resultRoute);



// Error handler middlewares
app.use(errorHandler);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));