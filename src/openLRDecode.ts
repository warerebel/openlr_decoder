import { getLRP } from "./decodeLRP";
import { getCandidatesForLRP, getNodesForGraph } from "./getCandidates";
import { chooseWinningNodes } from "./chooseWinningNodes";
import { Mongo } from "./mongo";
import { buildLinkLookups, getGraph } from "./graph";
import type { linkLookup, node } from "./nodes";
import type { LRPObject } from "./LRP";
import type Graph from "node-dijkstra";

type PathResult = {
    path: string,
    cost: number
}

export interface OpenLRDecodeOptions {
    searchRadius?: number | undefined;
    targetBearing?: number | undefined;
}

export async function decodeOpenLRReference(openLRRef: string, collectionName: string, options: OpenLRDecodeOptions) {
    const decodedOpenLR = getLRP(openLRRef);
    const winningNodes = await getWinningNodes(decodedOpenLR, collectionName, options);
    if (winningNodes.length > 1) {
        const graph = await buildGraph(decodedOpenLR, collectionName);
        const path = getPath(winningNodes as string[], graph.graph);
        const route = getRoute(path.path, graph.linklookup);
        return {route: route, cost: path.cost};
    }
    return {route: null, cost: null};
}

async function getWinningNodes(decodedOpenLR: LRPObject, collectionName: string, options: OpenLRDecodeOptions) {
    const collection = Mongo.getCollection(collectionName);
    const candidateNodes = await getCandidatesForLRP(decodedOpenLR, collection, options.searchRadius) as unknown as node[][];
    const winningNodes = chooseWinningNodes(decodedOpenLR, candidateNodes, options.targetBearing);
    return winningNodes;
}

async function buildGraph(decodedOpenLR: LRPObject, collectionName: string) {
    const collection = Mongo.getCollection(collectionName);
    const nodesForGraph = await getNodesForGraph(decodedOpenLR, collection);
    const lookups = buildLinkLookups(nodesForGraph as unknown as node[]);
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

