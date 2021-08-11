const { ObjectId, MongoClient } = require(`mongodb`);
const { config } = require(`../config/config`);

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const DB_HOST = config.dbHost;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
class MongoLib {

    dbName;
    client;
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err) {
                    reject(err);
                }

                console.log('connection added to mongo')
                resolve(this.client.db(this.dbName));

            });
        });
    }

    getAll(collection) {
        return this.connect().then(db => {
            return db.collection(collection).find().toArray();
        })
    }


    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data)
        })
    }

    get(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).findOne(data);
        })

    }

    getById(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({_id: ObjectId(id)});
        })

    }
    
    findByPostId(collection,id){
        return this.connect().then(db=>{
            return db.collection(collection).find({postId:{id: ObjectId(id)}})
        })
    }

    update(collection, id, data) {
        return db.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
        })
    }

    delete(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne(data);
        })
    }

}

module.exports = MongoLib;
