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
    const TopLeft: number[] = [-180, 180];
    const BottomRight: number[] = [180, -180];
    for (const LRP of LRPObject.properties._points.properties){
        if(LRP.properties._latitude > TopLeft[0])
            TopLeft[0] = LRP.properties._latitude;
        if(LRP.properties._latitude < BottomRight[0])
            BottomRight[0] = LRP.properties._latitude;
        if(LRP.properties._longitude > BottomRight[1])
            BottomRight[1] = LRP.properties._longitude;
        if(LRP.properties._longitude < TopLeft[1])
            TopLeft[1] = LRP.properties._longitude;
    }
    const paddingValue = 0.01;
    return {type: "Polygon", coordinates: [[[TopLeft[1] + paddingValue, TopLeft[0] - paddingValue], [TopLeft[1] + paddingValue, BottomRight[0] + paddingValue], [BottomRight[1] - paddingValue, BottomRight[0] + paddingValue], [BottomRight[1] - paddingValue, TopLeft[0] - paddingValue],[TopLeft[1] + paddingValue, TopLeft[0] - paddingValue]]]};
}
