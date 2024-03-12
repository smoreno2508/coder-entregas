import bcrypt from "bcrypt";
import { NotFoundError, ConflictError } from "../errors/customErrors.js";

import sendEmail from "./MailerService.js";
import InactiveUserDeleteResponseDTO from "../DTO/users/InactiveUserDeleteResponseDTO.js";

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

        if (user.role !== 'ADMIN') {
            const createdCart = await this.cartRepository.createCart();
            user.cartId = createdCart._id;
        }

        const { password } = user;

        const hash = await bcrypt.hash(password, 10);

        user.password = hash;

        return await this.userRepository.create(user);
    }

    async update(id, data) {
        const userUpdate = await this.userRepository.update(id, data);
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

        const requiredDocuments = ['dni', 'address', 'bank'];
        const documentsUploaded = user.documents.map(doc => doc.name);
        const hasAllDocuments = requiredDocuments.every(doc => documentsUploaded.includes(doc));

        if (!hasAllDocuments) throw new ConflictError('User does not have all required documents uploaded.');

        if (user.role === 'ADMIN') throw new ConflictError('User is an admin and cannot be updated.');

        const newRole = user.role === 'PREMIUM' ? 'CLIENT' : 'PREMIUM';

        await this.userRepository.update(id, { role: newRole });

        return { email: user.email, newRole }

    }

    async updateLastConnection(userId) {
        await this.userRepository.update(userId, { last_connection: Date.now() });
    }

    async saveUserDocuments({ id, dni, address, bank }) {
        const savedDocuments = await this.userRepository.update(id, {
            documents: [
                {
                    name: "dni",
                    reference: dni[0].path,
                },
                {
                    name: "address",
                    reference: address[0].path,
                },
                {
                    name: "bank",
                    reference: bank[0].path,
                },
            ],
        });
        return savedDocuments;
    };


    async deleteInactiveUsers() {


        const twoDaysAgo = new Date();

        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const usersToDelete = await this.userRepository.getInactiveUsers({ last_connection: { $lt: twoDaysAgo } });

        if (usersToDelete.length === 0) throw new NotFoundError('No inactive user found to delete.');

        const emails = usersToDelete.map(user => user.email);
        const names = usersToDelete.map(user => `${user.firstName} ${user.lastName}`)

        const deleteInactiveUsers = await this.userRepository.deleteMany({ _id: { $in: usersToDelete.map(user => user._id) } }); 

        if(emails.length > 0){
            emails.map( email => {
                sendEmail(
                    email,
                    'Inactive User',
                    'eliminacionInactivos',
                    {
                        names: names,
                        email: email,
                    }
                )
            })
        }

        return new InactiveUserDeleteResponseDTO({
            deleteUserQuantity: deleteInactiveUsers.deleteCount,
            emails: emails
        });
    }

}