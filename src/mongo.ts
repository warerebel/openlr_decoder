import {MongoClient, Db} from "mongodb";
import type {Polygon} from "./getCandidates";
import {storageOption} from "./storageOption";

/* istanbul ignore file */

export class Mongo extends storageOption{

    static client: MongoClient;
    static db: Db;

    constructor(){
        super();
    }

    override async init(url: string, dbName: string){
        Mongo.client = new MongoClient(url);
        await Mongo.client.connect();
        Mongo.db = Mongo.client.db(dbName);
        return Mongo.client;
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
}
