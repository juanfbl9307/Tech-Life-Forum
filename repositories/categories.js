const MongoLib = require("../lib/mongo");
const mysql = require('../lib/mysql');
const mongoDB = new MongoLib();

const Category = module.exports;
const collection = "categories";
const database = mysql;

Category.create = async (name) => {
    const body = name ;
    const createCategory = await database.create(collection, body);
    return createCategory;
};

Category.getAll = async () => {
    const categoriesDb = await database.getAll(collection);
    return categoriesDb;
};

Category.findByName = async (name) => {
    const categoryFinded = await database.filter(collection, name);
    return categoryFinded;
};

Category.findById = async (id)=>{
    //getbyid
    const categoryIdFinded = await database.getById(collection,id);
    return categoryIdFinded;
}

