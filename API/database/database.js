const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require("../config/config");
const assert = require("assert");
const log = require("../tools/logger");
// Connection URL
const uri = config.database.uri;
// Database Name
const dbName = config.database.dbName;
let client = null;

// Options de connexions
const option = {
    useNewUrlParser: true,
    promiseLibrary: Promise,
};

/**
 * Fonction de fermeture de la base de données
 * @param client
 */
function closeDbConnection(client) {
    client.close();
    console.log("Connection closed");
}


module.exports = {
    insertDocument: (sCollection, data = {}, res) => {
        // Connexion a la base Mongo
        const client = new MongoClient(uri, option);
        client.connect((err) => {
            if (err) log.error(`Error > ${err.message}`);
            log.trace("Connected successfully to server");
            dbConn = client.db(dbName);
            const collection = dbConn.collection(sCollection);
            if (data.length > 1) {
                // Insertion de plusieurs documents
                collection.insertMany(data, (error, result) => {
                    if (error) log.error(`Error > ${error.message}`);
                    log.trace(result.insertedCount);
                    res.status(201).send({inserted: result.insertedCount});
                });
            } else {
                // Insertion d'un document
                collection.insertOne(data, (error, result) => {
                    if (error) log.error(`Error > ${error.message}`);
                    log.trace(result.insertedCount);
                    res.status(201).send({result: result.insertedCount, id: result.insertedId});
                });
            }
        });
        // FIXME La connexion se ferme avant l'opération d'insertion
        // closeDbConnection(client);
    },
    getAllDocument: (sCollection, res) => {
        // Connexion a la base Mongo
        const client = new MongoClient(uri, option);
        client.connect((err) => {
            if (err) log.error(`Error > ${err.message}`);
            log.trace("Connected successfully to server");
            dbConn = client.db(dbName);
            const collection = dbConn.collection(sCollection);
            // récuperation de tous les documents sur la forme d'un tableau
            collection.find({}).toArray(function (err, docs) {
                if (err) log.error(`Error > ${error.message}`);
                log.trace("Found the following records");
                res.status(200).send(docs);
            });
        });
        // closeDbConnection(client);
    },
    getDocumentByID: async (sCollection, id, res) => {
        const client = new MongoClient(uri, option);
        client.connect((err) => {
            if (err) log.error(`Error > ${err.message}`);
            log.trace("Connected successfully to server");
            dbConn = client.db(dbName);
            const collection = dbConn.collection(sCollection);
            //Récupération d'un seul document (recherche par ObjectID)
            collection.findOne({"_id": new ObjectID(id)}, (err, doc) => {
                if (err) log.error(`Error > ${error.message}`);
                log.trace("Found the following records");
                res.status(200).send(doc);
                // closeDbConnection(client);
            });
        });
    },
    findDocumentByIdAndUpdate: (sCollection, id, data, res) => {
        const client = new MongoClient(uri, option);
        client.connect((err) => {
            if (err) log.error(`Error > ${err.message}`);
            log.trace("Connected successfully to server");
            dbConn = client.db(dbName);
            const collection = dbConn.collection(sCollection);
            // Recherche un document par ID et update
            collection.findOneAndUpdate({"_id": new ObjectID(id)}, {$set: data}, (err, result) => {
                if (err) log.error(`Error > ${error.message}`);
                res.status(200).send({result: result.ok, id: id});
            });
        });
    },
    findDocumentByIdAndDelete: (sCollection, id, res) => {
        const client = new MongoClient(uri, option);
        client.connect((err) => {
            if (err) log.error(`Error > ${err.message}`);
            log.trace("Connected successfully to server");
            dbConn = client.db(dbName);
            const collection = dbConn.collection(sCollection);
            // Recherche un document par ID et delete
            collection.findOneAndDelete({"_id": new ObjectID(id)}, (err, result) => {
                if (err) log.error(`Error > ${error.message}`);
                res.status(200).send({result: result.ok, id: id});
            });
        });
    }

};
