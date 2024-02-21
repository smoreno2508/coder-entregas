import multer from "multer";
import { __dirname } from "../helpers/utils.js";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
const maxFileSize = 1048576; //** 1MB creo que es bastante razonable de momento d(°u°)b */

const storageConfig = {
    uploads: {
        profiles: `${__dirname}/docs/profiles`,
        products: `${__dirname}/docs/products`,
        default: `${__dirname}/docs/documents`
    },
    filenameGenerator: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
};

const validateFile = (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      const error = new multer.MulterError("Tipo de archivo no válido");
      return cb(error, false);
    }
  
    if (file.size > maxFileSize) {
      const error = new multer.MulterError("El archivo excede el tamaño máximo");
      return cb(error, false);
    }
  
    cb(null, true);
  };

const determineDestination = (req, file, cb) => {
    const destination = storageConfig.uploads[file.fieldname] || storageConfig.uploads.default;
    cb(null, destination);
}

const storage = multer.diskStorage({
    destination: determineDestination,
    filename: storageConfig.filenameGenerator
});

const upload = multer({ storage: storage, limits: { fileSize: maxFileSize }, fileFilter: validateFile });

export default upload;
