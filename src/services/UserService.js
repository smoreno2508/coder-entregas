import { NotFoundError, ConflictError } from "../errors/customErrors.js";
import { buildLogger } from "../helpers/logger.js";
import bcrypt from "bcrypt";


const logger = buildLogger("UserService");
export default class UserService {

    constructor(userRepository, cartRepository) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
    }

    async findAll() {
        const users = await this.userRepository.findAll();
        if (users.length === 0) {
            throw new NotFoundError("No users found.");
        }
        return users;
    }

    async findById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError("User not found.");
        }
        return user;
    }

    async findByEmail(email) {
        return await this.userRepository.findByEmail(email);
    }

    async create(user) {

        await this.userExist(user.email);

        if (user.role !== 'ADMIN' && user.role !== 'PREMIUM') {
            const createdCart = await this.cartRepository.createCart();
            user.cartId = createdCart._id;
        }

        const { password } = user;

        const hash = await bcrypt.hash(password, 10);

        user.password = hash;

        return await this.userRepository.create(user);
    }

    async update(id, user) {
        const userUpdate = await this.userRepository.update(id, user);
        if (!userUpdate) throw new NotFoundError("User not found.");
        return userUpdate;
    }

    async delete(id) {
        return await this.userRepository.delete(id);
    }


    //metodos auxiliares

    async userExist(email) {
        const userExist = await this.userRepository.findByEmail(email);
        if (userExist) {
            throw new ConflictError(`User with email ${email} already exists!`);
        }
    }

    async requestPasswordReset(email) {
        return await this.userRepository.createPasswordResetToken(email);
    }

    async resetUserPassword(token, newPassword) {

        const user = await this.userRepository.getUserByTempToken(token);

        if (!user) throw new NotFoundError('el token no es valido o usuario no encontrado.');

        const match = await bcrypt.compare(newPassword, user.password);

        if (match) throw new ConflictError('la contraseña no puede ser igual a la anterior');

        const hash = await bcrypt.hash(newPassword, 10);

        return await this.userRepository.resetPassword(token, hash);
    }


    async updateUserRole(id) {

        const user = await this.userRepository.findById(id);

        if (!user) throw new NotFoundError('User not found.');

        if (user.role === 'ADMIN') throw new ConflictError('User is an admin and cannot be updated.');

        const newRole = user.role === 'PREMIUM' ? 'CLIENT' : 'PREMIUM';

        await this.userRepository.update(id, { role: newRole });

        return { email: user.email, newRole }

    }

}