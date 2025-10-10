const db = require("../db");
const { userService } = require("../services")(db);

exports.getUsers = async (req, res, next) => {
    try {
        res.status(200).json(await userService.getUsers());
    } catch (error) {
        next(error);
    }
};

exports.getUser_Profiles = async (req, res, next) => {
    try {
        res.status(200).json(await userService.getUser_Profiles());
    } catch (error) {
        next(error);
    }
};

exports.getUsersByPage = async (req, res, next) => {
    try {
        res.status(200).json(await userService.getUsersByPage(req.paramPage));
    } catch (error) {
        next(error);
    }
};

exports.getUser_ProfilesByPage = async (req, res, next) => {
    try {
        res.status(200).json(await userService.getUser_ProfilesByPage(req.paramPage));
    } catch (error) {
        next(error);
    }
};

exports.userDelete = async (req, res, next) => {
    try {
        res.status(200).json(await userService.userDelete(req.userId));
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    const { email, password, username } = req.body || {};
    try {
        res.status(200).json(await userService.createUser({
            email,
            password,
            username,
        }));
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUser(req.userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};
