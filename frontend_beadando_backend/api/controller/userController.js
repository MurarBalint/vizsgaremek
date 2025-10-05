const db = require("../db");

const { userService } = require("../services")(db);


exports.getUsers = async (req, res, next) =>
{
    try 
    {
        res.status(200).json(await userService.getUsers());
    } 
    catch (error) 
    {
        next(error);
    };
};

exports.getUser_Profiles = async (req, res, next) =>
{
    try 
    {
        res.status(200).json(await userService.getUser_Profiles());
    } 
    catch (error) 
    {
        next(error);  
    };
};

exports.getUserById = async (req, res, next) =>
{
    try 
    {
        res.status(200).json(await userService.getUserById(req.userId));
    } 
    catch (error) 
    {
        next(error);  
    };
};

exports.getUser_ProfilesById = async (req, res, next) =>
{
    try 
    {
        res.status(200).json(await userService.getUser_ProfilesById(req.user_profilesId));
    } 
    catch (error) 
    {
        next(error);  
    };
};

exports.createUser = async (req, res, next) =>
{
    const { email, password_hash, username, role, is_active, last_login } = req.body || {};

    try
    {
        res.status(201).json(await userService.createUser({ email, password_hash, username, role, is_active, last_login }));
    }
    catch(error)
    {
        next(error);
    }
}