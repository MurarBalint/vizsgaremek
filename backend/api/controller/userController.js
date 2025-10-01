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