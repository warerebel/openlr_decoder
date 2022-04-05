import Graph from "node-dijkstra";
import type {node, linkLookup, nodeChildLink, graphInput} from "./nodes";

export function buildLinkLookups(nodeCollection: Array<node>) {
    const linkLookup = {};
    const graphInput = {};
    nodeCollection.map(node => node.startLinks.map(link => addLinkToGraph(link, linkLookup, graphInput)));
    return {links: linkLookup as linkLookup, graphInput: graphInput as graphInput};
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
