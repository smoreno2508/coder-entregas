import { ForbidenError } from "../../errors/customErrors.js";

const autorizeRole = (...alowedRoles) => {
    return (req, res, next) => {
        if (!alowedRoles.includes(req.user.role)) {
            throw new ForbidenError("No tiene permisos para realizar esta acción.");
        }
        next();
    }
}
export default autorizeRole;