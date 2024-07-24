import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Voting System API',
            version: '1.0.0',
            description: 'API documentation for the Voting System',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'], // Paths to files containing OpenAPI definitions
};

export default swaggerOptions;
