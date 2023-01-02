import {MongoClient, Db} from "mongodb";
import type {Polygon} from "./getCandidates";
import {storageOption} from "./storageOption";
import type {storageOptions} from "../index";

/* istanbul ignore file */

export class Mongo extends storageOption{

    static client: MongoClient;
    static db: Db;

    constructor(){
        super();
    }

    override async init(options: storageOptions){
        const url = this.getURL(options);
        Mongo.client = new MongoClient(url);
        await Mongo.client.connect();
        Mongo.db = Mongo.client.db(options.dbName);
        return Mongo.client;
    }

    getURL(options: storageOptions){
        if(options.username && options.password){
            if(!options.authMechanism)
                options.authMechanism = "DEFAULT";
            return `mongodb://${options.username}:${options.password}@${options.url}/?authMechanism=${options.authMechanism}`;
        } else {
            return `mongodb://${options.url}`;
        }
    }

    override async findNodesNearPoint(latitude: number, longitude: number, searchRadius: number){
        const collection = Mongo.db.collection("nodes");
        return collection.find({
            geometry: {
                $near:{
                    $geometry: { type: "Point",  coordinates: [longitude, latitude] },
                    $minDistance: 0,
                    $maxDistance: searchRadius
                }
            }
        }).toArray();
    }

    override async findNodesInPolygon(polygon: Polygon): Promise<unknown> {
        const collection = Mongo.db.collection("nodes");
        return collection.find({
            geometry: {
                $geoWithin: {
                    $geometry: polygon
                }
            }
        }).toArray();
    }

    override async close(): Promise<unknown> {
        return Mongo.client.close();
    }
}
