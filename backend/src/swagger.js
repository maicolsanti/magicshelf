import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Magicshelf',
        version: '1.0.0',
        description: 'Documentazione API generata con Swagger',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Server locale',
        },
    ],
};


const swaggerOptions = {
    definition: swaggerDefinition,
    apis: ['./src/routes/*.js'], // Percorso ai file di route
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
