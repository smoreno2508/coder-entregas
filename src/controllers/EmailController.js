import { successResponse } from "../helpers/responseMaker.js";
import sendEmail from "../services/mailerService.js";
import { userService } from "../services/index.js";
import { NotFoundError } from "../errors/customErrors.js";

const sendEmailResetPassword = async (req, res, next) => {
    try {
        const { email } = req.params;

        const user = await userService.findByEmail(email);

        if (!user) return next(new NotFoundError('el usuario no se encuentra registrado'));

        const token = await userService.requestPasswordReset(email);

        const emailSent = await sendEmail(
            email,
            'ResetPassword',
            'recuperacion',
            {
                id: `${user._id}`,
                nombre: `${user.firstName} ${user.lastName}`,
                token: `${token}`,
            });

        successResponse(res, 'Email sent successfully', emailSent);
    } catch (err) {
        next(err);
    }
}

export {
    sendEmailResetPassword
}