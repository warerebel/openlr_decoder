import { Mongo } from "./mongo";
import type { Polygon } from "./getCandidates";
import { storageOption } from "./storageOption";
import type {storageOptions} from "../index";
import {storageBackends} from "../index";

/* istanbul ignore file */

export class configureStorage {

    static storage: storageOption;

    constructor(options: storageOptions) {
        switch (options.storageBackend) {
        case storageBackends.mongodb: configureStorage.storage = new Mongo();
            break;
        default: throw (new Error("Unrecognised storage option"));
        }
    }

    static async init(storageOptions: storageOptions) {
        return configureStorage.storage.init(storageOptions);
    }

    static async findNodesNearPoint(latitude: number, longitude: number, searchRadius: number) {
        return configureStorage.storage.findNodesNearPoint(latitude, longitude, searchRadius);
    }

    static async findNodesInPolygon(polygon: Polygon) {
        return configureStorage.storage.findNodesInPolygon(polygon);
    }

    static async close() {
        return configureStorage.storage.close();
    }
}
