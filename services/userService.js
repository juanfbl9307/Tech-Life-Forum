const User = require("../repositories/users");

const UserService = module.exports;

UserService.create = async (username, password, role) => {
    if (await User.get({ username: username })) {
        creation = {
            message: "Username already exist",
            status: 400
        }
    } else {
        await User.create(username, password, role);
        creation = {
            message: "Username created",
            status: 200
        }
    };
    return creation;
};

UserService.getList = async ()=>{
    const categories = await User.getAll();
    return categories;
}
