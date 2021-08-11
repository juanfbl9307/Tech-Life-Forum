const MongoLib = require("../lib/mongo");
const mysql = require('../lib/mysql');
const mongoDB = new MongoLib();

const Post = module.exports;
const collection = "post";
const database = mysql;

Post.create = async (category, posterId, content) => {
    const body = {category, posterId, content };
    const createPost = await database.create(collection, body);
    return createPost;
};

Post.getAll = async () => {
    const commentsDb = await database.getAll(collection);
    return commentsDb;
};

Post.getById = async (id) =>{
    const commentsById = await database.getById(collection,id);
    return commentsById;
}

Post.findOne = async (data) => {
    const categoryFinded = await database.get(collection, data);
    return categoryFinded;
};

