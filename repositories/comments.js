const MongoLib = require("../lib/mongo");
const mysql = require('../lib/mysql');
const mongoDB = new MongoLib();

const Comment = module.exports;
const collection = "comments";
const database = mysql;

Comment.create = async (postId, posterId, content) => {
    const body = { postId, posterId, content };
    const createPost = await database.create(collection, body);
    return createPost;
};

Comment.find = async (postId) => {
    //findbypostId
    const commentFilter = await database.findByPostId(collection, postId)
    return commentFilter;
}

Comment.findOne = async (data) => {
    const categoryFinded = await database.get(collection, data);
    return categoryFinded;
};