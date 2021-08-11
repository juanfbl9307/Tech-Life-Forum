const MongoLib = require("../lib/mongo");
const mysql = require('../lib/mysql');
const mongoDB = new MongoLib();

const md5 = require("md5");

const User = module.exports;
const collection = "users";
//PARA CAMBIAR DE BASES DE DATOS CAMBIAR database a mongoDB o mysql
const database = mysql;

User.auth = async (username, password) => {
    const query = { username, password };
    return database.filter(collection, { password: md5(JSON.stringify(query)) });
};

User.create = async (username, password, role) => {
    const query = { username, password };
    const createUser = await database.create(collection, ({ username, role, date: new Date(), password: md5(JSON.stringify(query)) })); 
    return createUser;
};

User.getAll = async () => {
    const userDb = await database.getAll(collection);
    return userDb;
};


User.get = async (data) => {
    const userFinded = await database.filter(collection, data);
    return userFinded;
};


