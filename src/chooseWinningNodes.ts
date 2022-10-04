import type { LRPObject, LRP } from "./LRP";
import type { node, nodeChildLink } from "./nodes";
import {checkFow, checkBearing} from "./checkLinkProperties";

export function chooseWinningNodes(LRPObject: LRPObject, candidateNodes: node[][], targetBearing = 25) {
    const winningNodes = [];
    for (const LRPNodes in candidateNodes) {
        const LRP = LRPObject.properties._points.properties[LRPNodes];
        for (const node in candidateNodes[LRPNodes]) {
            const candidateNode = candidateNodes[LRPNodes][node];
            const result = checkCandidateNode(LRP, candidateNode, targetBearing);
            if (result.won) {
                winningNodes.push(result.node);
                break;
            }
        }
    }
    return winningNodes;
}

function checkCandidateNode(LRP: LRP, node: node, targetBearing: number){
    if(!LRP.properties._isLast){
        for(const linkNo in node.startLinks){
            if(checkLink(node.startLinks[linkNo], LRP, targetBearing, false))
                return {won: true, node: node.startLinks[linkNo].startnode};
        }
        for(const linkNo in node.startLinks){
            if(checkLink(node.startLinks[linkNo], LRP, targetBearing, true))
                return {won: true, node: node.startLinks[linkNo].startnode};
        }
    } else{
        for(const linkNo in node.endLinks){
            if(checkLink(node.endLinks[linkNo], LRP, targetBearing, false))
                return {won: true, node: node.endLinks[linkNo].endnode};
        }
        for(const linkNo in node.endLinks){
            if(checkLink(node.endLinks[linkNo], LRP, targetBearing, true))
                return {won: true, node: node.endLinks[linkNo].endnode};
        }
    }
    return {won: false};
}

function checkLink(link: nodeChildLink, LRP: LRP, targetBearing: number, skipFOW = false){
    if(skipFOW || checkFow(link.fow, LRP.properties._fow)){
        if(checkBearing(link.bearing, LRP.properties._bearing, targetBearing)){
            if(link.frc <= LRP.properties._frc)
                return true;
        }
    }
    return false;
}
