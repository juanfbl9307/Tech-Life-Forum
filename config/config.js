require('dotenv').config();

const { NODE_ENV, PORT, CORS, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER } = process.env;

const config = {
    dev: NODE_ENV !== 'production',
    port: PORT || 3000,
    cors: CORS,
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
    dbHost: DB_HOST,
    dbName: DB_NAME,
};
const security = {
    secret: "techLifeIsGoingToBeforEver!$",
}

const mysql = {
    host: MYSQL_HOST || 'remotemysql.com',
    user: MYSQL_USER || "P1NY0s1oYa",
    password: MYSQL_PASSWORD || "uz9lvGYkFL",
    database: MYSQL_DATABASE || "P1NY0s1oYa",


}

module.exports = { config, security, mysql };

