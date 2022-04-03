import {node} from "../src/nodes";
import {buildLinkLookups, getGraph} from "../src/graph";
import * as assert from "assert";

import nodesCollection from "./resources/nodesCollection.json";

describe("graph", function(){

    describe("buildLinkLookups", function(){

        const linkLookup: {[index: string]:{[index: string]:{[index: string]:unknown}}} = {};
        const graphInput: {[index: string]:{[index: string]:number}} = {};

        before(function(){
            linkLookup["{E699D3DD-19C5-4705-BF19-C296FD2D429E}0"] = {};
            linkLookup["{E699D3DD-19C5-4705-BF19-C296FD2D429E}0"]["{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0"] = {length: 32, linkid: "{A8EF8183-7EE2-444A-9E5D-361ECCA01522}"};
            linkLookup["{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0"] = {};
            linkLookup["{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0"]["{0436F360-42B4-42D8-833C-682B36BF5972}0"] = {length: 38, linkid: "{D80DA8F6-1764-4F61-ADCD-9EBCF56A698C}"};
            linkLookup["{0436F360-42B4-42D8-833C-682B36BF5972}0"] = {};
            linkLookup["{0436F360-42B4-42D8-833C-682B36BF5972}0"]["{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0"] = {length: 38, linkid: "{D80DA8F6-1764-4F61-ADCD-9EBCF56A698C}"};
            linkLookup["{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0"]["{E699D3DD-19C5-4705-BF19-C296FD2D429E}0"] = {length: 38, linkid: "{D80DA8F6-1764-4F61-ADCD-9EBCF56A698C}"};
            graphInput["{E699D3DD-19C5-4705-BF19-C296FD2D429E}0"] = {};
            graphInput["{E699D3DD-19C5-4705-BF19-C296FD2D429E}0"]["{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0"] = 32;
            graphInput["{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0"] = {};
            graphInput["{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0"]["{0436F360-42B4-42D8-833C-682B36BF5972}0"] = 38;
            graphInput["{0436F360-42B4-42D8-833C-682B36BF5972}0"] = {};
            graphInput["{0436F360-42B4-42D8-833C-682B36BF5972}0"]["{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0"] = 38;
            graphInput["{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0"]["{E699D3DD-19C5-4705-BF19-C296FD2D429E}0"] = 38;
        });

        it("returns graph lookup and link lookup", function(){
            const nodeInput: node[] = nodesCollection as node[];
            const result = buildLinkLookups(nodeInput);
            assert.deepStrictEqual(result.links, linkLookup);
            assert.deepStrictEqual(result.graphInput, graphInput);
        });

    });

    describe("getGraph", function(){
    
        it("Creates a navigable map object", function(){
            const nodeInput: node[] = nodesCollection as node[];
            const lookup = buildLinkLookups(nodeInput);
            const graph = getGraph(lookup.graphInput);
            const path = graph.path("{E699D3DD-19C5-4705-BF19-C296FD2D429E}0", "{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0",{cost: true});
            assert.deepStrictEqual(path, {cost: 32, path: ["{E699D3DD-19C5-4705-BF19-C296FD2D429E}0", "{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0"]});
            assert.deepStrictEqual(lookup.links[path.path[0]][path.path[1]].linkid, "{A8EF8183-7EE2-444A-9E5D-361ECCA01522}");
        });

    });

});