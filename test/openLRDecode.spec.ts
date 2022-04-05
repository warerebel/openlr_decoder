import {decodeOpenLRReference, OpenLRDecodeOptions} from "../src/openLRDecode";
import * as assert from "assert";
import * as sinon from "sinon";
import {Mongo} from "../src/mongo";
import type {Collection} from "mongodb";

import lrpOneCandidates from "./resources/lrpOneCandidates.json";
import lrpTwoCandidates from "./resources/lrpTwoCandidates.json";
import lrpThreeCandidates from "./resources/lrpThreeCandidates.json";
import lrpFourCandidates from "./resources/lrpFourCandidates.json";
import allNodes from "./resources/decodeAllNodes.json";
import targetPath from "./resources/targetPath.json";

describe("openLRDecode", function(){

    describe("decodeOpenLRReference", function(){
        let findResult: Collection;

        before(function(){ 
            const findFake = sinon.stub();
            findResult = {find: findFake} as unknown as Collection;
            sinon.stub(Mongo, "getCollection").returns(findResult);
            findFake.onCall(0).returns({toArray: function(){return Promise.resolve(lrpOneCandidates);}});
            findFake.onCall(1).returns({toArray: function(){return Promise.resolve(lrpTwoCandidates);}});
            findFake.onCall(2).returns({toArray: function(){return Promise.resolve(lrpThreeCandidates);}});
            findFake.onCall(3).returns({toArray: function(){return Promise.resolve(lrpFourCandidates);}});
            findFake.onCall(4).returns({toArray: function(){return Promise.resolve(allNodes);}});
        });

        it("decodes an openLRRef to a route of linkids", async function(){
            const openLRRef = "C/+ASyT5EAogGPylBIAKP9DK4RZfCjsf9l8BwAwP";
            const options: OpenLRDecodeOptions = {targetBearing: 45, searchRadius: 50};
            const result = await decodeOpenLRReference(openLRRef, "test", options);
            const compare = [];
            for(const link of result.route as Array<{linkid: string}>)
                compare.push(link.linkid);
            assert.deepStrictEqual(compare, targetPath.path);
        });

    });

});
