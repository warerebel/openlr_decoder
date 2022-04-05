import {MongoClient, Db} from "mongodb";

/* istanbul ignore file */

export class Mongo {

    static client: MongoClient;
    static db: Db;

    static async init(url: string, dbName: string){
        Mongo.client = new MongoClient(url);
        await Mongo.client.connect();
        Mongo.db = Mongo.client.db(dbName);
    }

    static getCollection(collectionName: string){
        return Mongo.db.collection(collectionName);
    }
}
