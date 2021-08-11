const Post = require("../repositories/posts");
const Category = require("../repositories/categories");
const User = require("../repositories/users");


const PostService = module.exports;

PostService.create = async (categoryID, username, content) => {

    const category = await Category.findById(categoryID);

    if (category) {
        posterId = await User.get({ username: username });
        
        await Post.create({name: category.name, id: category._id}, posterId._id, content);
        creation = {message : `Posted in ${category.name}`,
        status : 200} 
    } else {
        creation = {
            message: `Category doesn't exist, talk with admin to create a new thread`,
            status: 400
        }
    };
    return creation;

};

PostService.getList = async (categoryId) => {
    const category = await Category.findById(categoryId)
    if (category) {
        posts = await Post.getById(categoryId);
        creation = {
            message: `The posts of ${category.name} are :`,
            status: 200
        }
    } else {
        creation = {
            message: `Category doesn't exist`,
            status: 400
        }
    }
    return { creation, posts };
}
