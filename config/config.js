require('dotenv').config({ path: './environments/.env' });

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
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,


}

module.exports = { config, security, mysql };

