

exports.getUsers = (req, res, next) =>
{
    const sv = 
    {
        name: "kispista",
        age: 5000
    }


    res.status(200).json(sv)
}