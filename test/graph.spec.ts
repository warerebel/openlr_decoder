import {node} from "../src/nodes";
import {buildLinkLookups, getGraph} from "../src/graph";
import * as assert from "assert";

import fullMap from "./resources/fullMap.json";

describe("graph", function(){

    describe("getGraph", function(){
    
        it("Creates a navigable map object with no frc restriction", function(){
            const nodeInput: node[] = fullMap as node[];
            const lookup = buildLinkLookups(nodeInput, 7);
            const graph = getGraph(lookup.graphInput);
            const path = graph.path("1", "4",{cost: true});
            assert.deepStrictEqual(path, {cost: 30, path: ["1", "2", "3", "4"]});
            assert.deepStrictEqual(lookup.links[path.path[0]][path.path[1]].linkid, "a");
            assert.deepStrictEqual(lookup.links[path.path[2]][path.path[3]].linkid, "c");
        });

        it("Creates a navigable map object with an frc restriction", function(){
            const nodeInput: node[] = fullMap as node[];
            const lookup = buildLinkLookups(nodeInput, 1);
            const graph = getGraph(lookup.graphInput);
            const path = graph.path("1", "4",{cost: true});
            assert.deepStrictEqual(path, {cost: 34, path: ["1", "5", "6", "4"]});
            assert.deepStrictEqual(lookup.links[path.path[0]][path.path[1]].linkid, "i");
            assert.deepStrictEqual(lookup.links[path.path[2]][path.path[3]].linkid, "k");
        });

    });

});