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
