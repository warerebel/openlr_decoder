import type { LRPObject, LRP } from "./LRP";
import type { node } from "./nodes";
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
            const link = node.startLinks[linkNo];
            if(checkFow(link.fow, LRP.properties._fow)){
                if(checkBearing(link.bearing, LRP.properties._bearing, targetBearing)){
                    if(link.frc <= LRP.properties._frc)
                        return {won: true, node: link.startnode};
                }
            }
        }
    } else{
        for(const linkNo in node.endLinks){
            const link = node.endLinks[linkNo];
            if(checkFow(link.fow, LRP.properties._fow)){
                if(checkBearing(link.bearing, LRP.properties._bearing)){
                    if(link.frc <= LRP.properties._frc)
                        return {won: true, node: link.endnode};
                }
            }
        }
    }
    return {won: false};
}
