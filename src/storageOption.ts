import type {Polygon} from "./getCandidates";
import type {storageOptions} from "../index";

export abstract class storageOption{
    abstract findNodesNearPoint(latitude: number, longitude: number, searchRadius: number): Promise<unknown>;
    abstract findNodesInPolygon(polygon: Polygon): Promise<unknown>;
    abstract init(storageOptions: storageOptions): Promise<unknown>;
    abstract close(): Promise<unknown>;
}
