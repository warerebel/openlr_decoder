import type {LRPObject, LRP} from "./LRP";
import {configureStorage} from "./storage";

const graphPadding = parseFloat(process.env["OPENLR_GRAPH_PADDING"] as string) || 0.010;

export async function getCandidatesForLRP(LRPObject: LRPObject, candidateSearchRadius = 50){
    const promises = [];
    for (const LRP of LRPObject.properties._points.properties){
        promises.push(getCandidateNodes(LRP, candidateSearchRadius));
    }
    return Promise.all(promises);
}

function getCandidateNodes(LRP: LRP, candidateSearchRadius: number){
    return configureStorage.findNodesNearPoint(LRP.properties._latitude, LRP.properties._longitude, candidateSearchRadius);
}

export function getNodesForGraph(LRPObject: LRPObject){
    const polygon = getPolygon(LRPObject);
    return configureStorage.findNodesInPolygon(polygon);
}

function getPolygon(LRPObject: LRPObject): Polygon{
    let Top = -180;
    let Left = 180;
    let Bottom = 180;
    let Right = -180;
    for (const LRP of LRPObject.properties._points.properties) {
        if (LRP.properties._latitude > Top)
            Top = LRP.properties._latitude;
        if (LRP.properties._latitude < Bottom)
            Bottom = LRP.properties._latitude;
        if (LRP.properties._longitude > Right)
            Right = LRP.properties._longitude;
        if (LRP.properties._longitude < Left)
            Left = LRP.properties._longitude;
    }
    const paddingValue = graphPadding;
    Top = Top + paddingValue;
    Bottom = Bottom - paddingValue;
    Left = Left - paddingValue;
    Right = Right + paddingValue;
    return { type: "Polygon", coordinates: [[[Left, Top], [Right, Top], [Right, Bottom], [Left, Bottom], [Left, Top]]] };
}

export interface Polygon {
    type: "Polygon",
    coordinates: [
        [
            [number, number],
            [number, number],
            [number, number],
            [number, number],
            [number, number]
        ]
    ]
}
