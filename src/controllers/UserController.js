import { userService } from "../services/index.js";
import { successResponse } from "../helpers/responseMaker.js";

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.findAll();
        successResponse(res, 'Users fetched successfully', users);
    } catch (err) {
        next(err);
    }
}

const createUser = async(req, res, next) => {
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

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.findById(id);
        successResponse(res, 'User fetched successfully', user);
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


export {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    resetPassword
}