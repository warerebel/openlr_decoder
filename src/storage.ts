import { Mongo } from "./mongo";
import type { Polygon } from "./getCandidates";
import { storageOption } from "./storageOption";

/* istanbul ignore file */

export interface storageOptions {
    storage: string
}

export class configureStorage {

    static storage: storageOption;

    constructor(options: storageOptions) {
        switch (options.storage) {
        case "mongodb": configureStorage.storage = new Mongo();
            break;
        default: throw (new Error("Unrecognised storage option"));
        }
    }

    static async init(url: string, dbName: string) {
        return configureStorage.storage.init(url, dbName);
    }

    static async findNodesNearPoint(latitude: number, longitude: number, searchRadius: number) {
        return configureStorage.storage.findNodesNearPoint(latitude, longitude, searchRadius);
    }

    static async findNodesInPolygon(polygon: Polygon) {
        return configureStorage.storage.findNodesInPolygon(polygon);
    }
}
