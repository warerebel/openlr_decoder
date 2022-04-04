import {checkFow} from "../src/checkLinkProperties";
import {formOfWay} from "../src/nodes";
import * as assert from "assert";

describe("checkLinkProperties", function(){

    describe("checkFow", function(){

        it("Confirms matching fow values", function(){
            const validLRPFowValues = [0, 1, 2, 2, 3, 4, 5, 6, 7];
            const validLinkFowEnums = [undefined, "M", "DC", "M", "SC", "R", "TS", "SL", "O"];
            for(const index in validLRPFowValues){
                assert.ok(checkFow(validLinkFowEnums[index] as formOfWay, validLRPFowValues[index]));
            }
        });

        it("Returns false when no mathcing fow made", function(){
            const result = checkFow("SL" as formOfWay, 8);
            assert.ok(!result);
        });

    });

});