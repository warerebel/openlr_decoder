import type {LRPObject, LRP} from "./LRP";
import {Collection} from "mongodb";

export async function getCandidatesForLRP(LRPObject: LRPObject, collection: Collection, candidateSearchRadius = 50){
    const promises = [];
    for (const LRP of LRPObject.properties._points.properties){
        promises.push(getCandidateNodes(LRP, collection, candidateSearchRadius));
    }
    return Promise.all(promises);
}

function getCandidateNodes(LRP: LRP, collection: Collection, candidateSearchRadius: number){
    return collection.find({
        geometry: {
            $near:{
                $geometry: { type: "Point",  coordinates: [LRP.properties._longitude, LRP.properties._latitude] },
                $minDistance: 0,
                $maxDistance: candidateSearchRadius
            }
        }
    }).toArray();
}

export function getNodesForGraph(LRPObject: LRPObject, collection: Collection){
    const polygon = getPolygon(LRPObject);
    return collection.find({
        geometry: {
            $geoWithin: {
                $geometry: polygon
            }
        }
    }).toArray();
}

function getPolygon(LRPObject: LRPObject){
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
    const paddingValue = 0.005;
    Top = Top + paddingValue;
    Bottom = Bottom - paddingValue;
    Left = Left - paddingValue;
    Right = Right + paddingValue;
    return { type: "Polygon", coordinates: [[[Left, Top], [Right, Top], [Right, Bottom], [Left, Bottom], [Left, Top]]] };
}
