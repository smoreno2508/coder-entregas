import { userService } from "../services/index.js";
import { successResponse } from "../helpers/responseMaker.js";
import UserResponseDTO from "../DTO/users/UserResponseDTO.js";

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.findAll();
        const usersDTO = users.map(user => UserResponseDTO.fromModel(user));
        successResponse(res, 'Users fetched successfully', usersDTO);
    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = await userService.create(req.body);
        successResponse(res, 'User created successfully', user);
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.update(id, req.body);
        successResponse(res, 'User updated successfully', user);
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await userService.delete(id);
        successResponse(res, 'User deleted successfully', null);
    } catch (err) {
        next(err);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.findById(id);
        const userDTO = UserResponseDTO.fromModel(user);
        successResponse(res, 'User fetched successfully', userDTO);
    } catch (err) {
        next(err);
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;

        await userService.resetUserPassword(token, newPassword);
        successResponse(res, 'Password reset successfully');
    } catch (err) {
        next(err);
    }
}

const updateUserRole = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const user = await userService.updateUserRole(uid);
        successResponse(res, 'User updated to premium successfully', user);
    } catch (err) {
        next(err);
    }
}

const saveUserDocuments = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { dni, address, bank } = req.files;
        const response = await userService.saveUserDocuments({ id, dni, address, bank });
        successResponse(res, 'Files saved successfully', { response });
    } catch (err) {
        next(err);
    }

}

const deleteInactiveUsers = async (req, res, next) => {
    try {
        const response = await userService.deleteInactiveUsers();
        successResponse(res, 'Inactive users has been delete.', { response })
    } catch (err) {
        next(err);
    }
}


export {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    resetPassword,
    updateUserRole,
    saveUserDocuments,
    deleteUser,
    deleteInactiveUsers
}