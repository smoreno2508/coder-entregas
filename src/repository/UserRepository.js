
import BaseRepository from "./BaseRepository.js";
import crypto from 'crypto';
import { NotFoundError } from "../errors/customErrors.js";

export default class UserRepository extends BaseRepository {

    constructor(model) {
        super(model)
    }

    async findByEmail(email) {
        return await this.model.findOne({ email });
    }

    async getRole(id) {
        return await this.model.findById(id, 'role');
    }

    async getUserByCart(cartId) {
        return await this.model.findOne({ cartId });
    }

    async getUserByTempToken(token){
        return await this.model.findOne({resetPasswordToken:token});
    }

    async createPasswordResetToken(email) {

        const user = await this.model.findOne({ email });

        if (!user) throw new NotFoundError('el usuario no se encuentra registrado');

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetExpires = Date.now() + 3600000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetExpires;
        await user.save();
        return resetToken;
    }

    async resetPassword(token, password) {
        const user = await this.model.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) throw new NotFoundError('el token no es valido o ha expirado');

        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        
        await user.save();
    }
}