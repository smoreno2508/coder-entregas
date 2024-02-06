import { __dirname } from "../helpers/utils.js";
import { config } from "dotenv";

config();

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentacion API de proyecto CoderHouse',
    },
  };
  
  const options = {
    swaggerDefinition,
    apis: [`${__dirname}/docs/*.yaml`], 
  };
  
  export default options;
  