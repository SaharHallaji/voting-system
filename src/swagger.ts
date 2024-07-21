import swaggerUi from "swagger-ui-express";
import { Express } from 'express';
import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Plan Vote System API',
            version: '1.0.0',
            description: 'API documentation for the Plan Vote System',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Adjust the path to where your route files are
};

const swaggerSpec = swaggerJsdoc(options);

export default (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
