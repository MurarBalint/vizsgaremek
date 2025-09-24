

exports.getUsers = (req, res, next) =>
{
    const sv = 
    {
        name: "fasz",
        age: 5000
    }


    res.status(200).json(sv)
}