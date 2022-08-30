import Graph from "node-dijkstra";
import type {node, linkLookup, nodeChildLink, graphInput} from "./nodes";

export function buildLinkLookups(nodeCollection: Array<node>, lfrc: number) {
    const linkLookup = {};
    const graphInput = {};
    nodeCollection.map(node => checkForEndpoints(node, linkLookup, graphInput, lfrc));
    return {links: linkLookup as linkLookup, graphInput: graphInput as graphInput};
}

function checkForEndpoints(node: node, linkLookup: linkLookup, graphInput: graphInput, lfrc: number){
    if(node.startLinks)
        node.startLinks.map(link => link.frc <= lfrc ? addLinkToGraph(link, linkLookup, graphInput): null);
    else
        node.endLinks.map(link => link.frc <= lfrc ? addLinkToGraph(link, linkLookup, graphInput): null);
}

export function getGraph(input: graphInput){
    return new Graph(input);
}

function addLinkToGraph(link: nodeChildLink, linkLookup: linkLookup, graphInput: graphInput): void{
    if(typeof linkLookup[link.startnode] === "undefined")
        linkLookup[link.startnode] = {};
    linkLookup[link.startnode][link.endnode] = {length: Math.round(link.cost), linkid: link.linkid};
    if(typeof graphInput[link.startnode] === "undefined")
        graphInput[link.startnode] = {};
    graphInput[link.startnode][link.endnode] = Math.round(link.cost);
}
