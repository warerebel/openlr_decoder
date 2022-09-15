import type {Polygon} from "./getCandidates";

export abstract class storageOption{
    abstract findNodesNearPoint(latitude: number, longitude: number, searchRadius: number): Promise<unknown>;
    abstract findNodesInPolygon(polygon: Polygon): Promise<unknown>;
    abstract init(url: string, dbName: string): Promise<unknown>;
}
