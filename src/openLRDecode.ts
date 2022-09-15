import { getLRP } from "./decodeLRP";
import { getCandidatesForLRP, getNodesForGraph } from "./getCandidates";
import { chooseWinningNodes } from "./chooseWinningNodes";
import { buildLinkLookups, getGraph } from "./graph";
import type { linkLookup, node } from "./nodes";
import type { LRPObject, LRP } from "./LRP";
import type Graph from "node-dijkstra";

type PathResult = {
    path: string,
    cost: number
}

export interface OpenLRDecodeOptions {
    searchRadius?: number | undefined;
    targetBearing?: number | undefined;
}

export async function decodeOpenLRReference(openLRRef: string, options: OpenLRDecodeOptions) {
    const decodedOpenLR = getLRP(openLRRef);
    const distance = decodedOpenLR.properties._points.properties.reduce(getLRPObjectLength, 0);
    const winningNodes = await getWinningNodes(decodedOpenLR, options);
    if (winningNodes.length > 1) {
        const graph = await buildGraph(decodedOpenLR);
        const path = getPath(winningNodes as string[], graph.graph);
        const route = getRoute(path.path, graph.linklookup);
        return {route: route, nodes: path.path, routeLength: path.cost, openLRRef: openLRRef, openLRDistance: distance};
    }
    return {route: null, nodes: null, routeLength: null, openLRRef: openLRRef, openLRDistance: distance};
}

function getLRPObjectLength(prev: number, cur: LRP){
    return prev + cur.properties._distanceToNext;
}

async function getWinningNodes(decodedOpenLR: LRPObject, options: OpenLRDecodeOptions) {
    const candidateNodes = await getCandidatesForLRP(decodedOpenLR, options.searchRadius) as unknown as node[][];
    const winningNodes = chooseWinningNodes(decodedOpenLR, candidateNodes, options.targetBearing);
    return winningNodes;
}

async function buildGraph(decodedOpenLR: LRPObject) {
    const nodesForGraph = await getNodesForGraph(decodedOpenLR);
    const lfrc = decodedOpenLR.properties._points.properties.reduce((pre, lrp) => lrp.properties._lfrcnp > pre ? lrp.properties._lfrcnp: pre, 0);
    const lookups = buildLinkLookups(nodesForGraph as unknown as node[], lfrc);
    const graph = getGraph(lookups.graphInput);
    return { graph: graph, linklookup: lookups.links };
}

function getPath(nodes: string[], graph: Graph) {
    const paths = [];
    for (let i = 0; i < (nodes.length - 1); i++) {
        paths.push(graph.path(nodes[i], nodes[i + 1], { cost: true }) as unknown as PathResult);
    }
    const result = { path: [] as string[], cost: 0 };
    for (const index in paths) {
        if (paths[index].path === null) {
            result.path = [];
            result.cost = 0;
            break;
        }
        result.path = result.path.concat(paths[index].path);
        result.cost += paths[index].cost;
    }
    return result;
}

function getRoute(routes: string[], linkLookup: linkLookup){
    const result = [];
    for(let i = 0; i < (routes.length -1); i++){
        if(routes[i] !== routes[i+1]){
            const link = linkLookup[routes[i]][routes[i+1]];
            result.push(link);
        }
    }
    return result;
}

