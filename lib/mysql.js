const mysql = require('mysql');
const config = require('../config/config');
const id = require('uuid');

let connection;
let dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

const handleCon = () => {
    connection = mysql.createConnection(dbconfig);
    connection.connect((err) => {
        if (err) {
            console.error('Db error', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected');
        }
    });

    connection.on('error', err => {
        console.error('Db error', err);
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        };
    });
};
handleCon();



const list = (table, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id ='${id}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

const create = (table, data) => {
    return new Promise((resolve, reject) => {
        let createId = id.v4();
        let keys = [];
        keys = Object.keys(data);
        let query = `INSERT INTO ${table} (id,${keys}) VALUES (?)`;
        let values = [];
        values = Object.values(data);
        values.unshift(createId);
        connection.query(query, [values], (err, result) => {
            console.log(err)
            if (err) {
                return reject(err)
            };
            resolve(result);
        });
    });
};

const getAll = (table) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM ${table}`;
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err)
                return reject(err);
            }
            resolve(result);
        });
    });
};

const get = (table, data) => {
    return new Promise((resolve, reject) => {
        let keys = [];
        keys = Object.keys(data);
        let query = `SELECT (${keys}) FROM ${table}`;
        connection.query(query, [keys], (err, result) => {
            if (err) {
                return reject(err)
            }
            if (result.length === 0 || result == undefined) {
                return resolve(undefined);
            }
            resolve(JSON.parse(JSON.stringify(result)));

        });
    });
};


const filter = (table, toFilter) => {
    const filtered = new Promise((resolve, reject) => {
        let key = [];
        key = Object.keys(toFilter);
        let value = [];
        value = Object.values(toFilter);
        console.log(key)

        let query = `SELECT * FROM ${table} WHERE ${key} = '${value}'`
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (result.length === 0 || result == undefined) {
                return resolve(undefined);
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });

    return filtered.then(result => {
        return Object.values(result)[result.length - 1];
    }).catch(e => {
        throw e;
    });
};

const getById = (table, id) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM ${table} WHERE id = '${id}'`
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (result.length === 0 || result == undefined) {
                return resolve(undefined);
            }
            resolve(result);
        });
    });
};



module.exports = {
    list,
    create,
    getAll,
    get,
    filter,
    getById,
};


