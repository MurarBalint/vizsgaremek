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

exports.createUser = async (req, res, next) =>
{
    const { email, password, username} = req.body || {};

    try
    {
        res.status(201).json(await userService.createUser({ email, password, username}));
    }
    catch(error)
    {
        next(error);
    }
}