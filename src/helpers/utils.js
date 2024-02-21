import mongoose from 'mongoose';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { BadRequestError } from '../errors/customErrors.js';
const currentDir = dirname(fileURLToPath(import.meta.url))
const __dirname = dirname(currentDir);

const formatDateHelper = (date, locale = 'es-CL') => new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(date));

const validateObjectId = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid id');
}

export  {
    __dirname,
    formatDateHelper,
    validateObjectId
}