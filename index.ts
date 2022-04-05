import {decodeOpenLRReference, OpenLRDecodeOptions} from "./src/openLRDecode";
import {Mongo} from "./src/mongo";

export{OpenLRDecodeOptions} from "./src/openLRDecode";

export async function initMongo(url: string, dbName: string){
    return Mongo.init(url, dbName);
}

export async function decodedOpenLR(openLRRef: string, collectionName: string, options: OpenLRDecodeOptions): Promise<{route: {length: number;linkid: string;}[];cost: number;} | {route: null;cost: null;}>{
    return decodeOpenLRReference(openLRRef, collectionName, options);
}
