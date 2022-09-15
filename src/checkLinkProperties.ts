import {formOfWay} from "./nodes";

// eslint-disable-next-line complexity
export function checkFow(currentLinkFow: formOfWay, LRPFow: number){
    switch(LRPFow){
    case 0: return true;
    case 1: return currentLinkFow === formOfWay.DualCarriageway || currentLinkFow === formOfWay.Motorway;
    case 2: return currentLinkFow === formOfWay.DualCarriageway || currentLinkFow === formOfWay.Motorway;
    case 3: return currentLinkFow === formOfWay.SingleCarriageway;
    case 4: return currentLinkFow === formOfWay.Roundabout;
    case 5: return currentLinkFow === formOfWay.TrafficSquare;
    case 6: return currentLinkFow === formOfWay.SlipRoad;
    case 7: return currentLinkFow === formOfWay.Other;
    default: return false;
    }
}

export function checkBearing(currentLinkBearing: number, LRPBearing: number, bearingError = 25){
    const targetBearing = LRPBearing > 180 ? LRPBearing - 360 : LRPBearing;
    const error = Math.abs(Math.abs(currentLinkBearing) - Math.abs(targetBearing));
    return error < bearingError ? true : false;
}
