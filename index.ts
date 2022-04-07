import {decodeOpenLRReference, OpenLRDecodeOptions} from "./src/openLRDecode";
import {Mongo} from "./src/mongo";

export{OpenLRDecodeOptions} from "./src/openLRDecode";

/**
 * @function initMongo - Initialise a connection to a mongodb instance
 * @param url {string} - The connection string for the mongodb instance to be used
 * @param dbName {string} - The name of the mongodb database to use
 * @returns {Promise} - A void Promise to wait for the initialisation to complete
 */
export async function initMongo(url: string, dbName: string){
    return Mongo.init(url, dbName);
}

/**
 * @function decodeOpenLR - Decode an OpenLR reference to a target network model
 * @param openLRRef {string} - The OpenLR reference to decode
 * @param collectionName {string} - The mongodb collection which holds the network nodes
 * @param options {object} - Options for the OpenLR decoding. The radius to search for candidate nodes in meters. The tolerance for matching link bearings in degrees.
 * @returns {Promise} - Returns a promise with the decode result
 */
export async function decodeOpenLR(openLRRef: string, collectionName: string, options: OpenLRDecodeOptions): Promise<{route: {length: number;linkid: string;}[];cost: number;} | {route: null;cost: null;}>{
    return decodeOpenLRReference(openLRRef, collectionName, options);
}
