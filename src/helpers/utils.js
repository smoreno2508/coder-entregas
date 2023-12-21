import { dirname } from 'path';
import { fileURLToPath } from 'url';
const currentDir = dirname(fileURLToPath(import.meta.url))
const __dirname = dirname(currentDir);

export  {
    __dirname,
}