import type {Polygon} from "./getCandidates";

export abstract class storageOption{
    abstract findNodesNearPoint(latitude: number, longitude: number, searchRadius: number): Promise<any>;
    abstract findNodesInPolygon(polygon: Polygon): Promise<any>;
    abstract init(url: string, dbName: string): Promise<any>;
}
