import mongoose from 'mongoose';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { BadRequestError } from '../errors/customErrors.js';
const currentDir = dirname(fileURLToPath(import.meta.url))
const __dirname = dirname(currentDir);

const validateObjectId = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid id');
}

export  {
    __dirname,
    validateObjectId
}