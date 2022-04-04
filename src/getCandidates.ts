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
