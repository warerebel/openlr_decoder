/* istanbul ignore file */
import {decodeOpenLRReference, OpenLRDecodeOptions} from "./src/openLRDecode";
import {configureStorage} from "./src/storage";

export{OpenLRDecodeOptions} from "./src/openLRDecode";

export enum storageBackends {
    mongodb = "mongodb"
}

export interface storageOptions {
    storageBackend: storageBackends;
    url: string;
    dbName: string;
    username?: string;
    password?: string;
    authMechanism?: string;
}

/**
 * @function initStorage - Initialise a connection to a backend storage
 * @param storageOptions - The storage backend solution to use
 * @returns {Promise} - A void Promise to wait for the initialisation to complete
 */
export async function initStorage(storageOptions: storageOptions): Promise<unknown>{
    new configureStorage(storageOptions);
    return configureStorage.init(storageOptions);
}

/**
 * @function decodeOpenLR - Decode an OpenLR reference to a target network model
 * @param openLRRef {string} - The OpenLR reference to decode
 * @param options {object} - Options for the OpenLR decoding. The radius to search for candidate nodes in meters. The tolerance for matching link bearings in degrees.
 * @returns {Promise} - Returns a promise with the decode result
 */
export async function decodeOpenLR(openLRRef: string, options: OpenLRDecodeOptions): Promise<{route: {length: number;linkid: string;}[]; routeLength: number; nodes: string[]; openLRRef: string; openLRDistance: number} | {route: null; routeLength: null;nodes: null; openLRRef: string; openLRDistance: number}>{
    return decodeOpenLRReference(openLRRef, options);
}

/**
 * @function closeConnection - Enables client to close connection to backend storage to exit node event loop
 * @returns {Promise} - A void Promise to wait for the initialisation to complete
 */
export async function closeConnection(): Promise<unknown>{
    return configureStorage.close();
}
