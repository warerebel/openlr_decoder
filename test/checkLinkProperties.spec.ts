import {checkFow, checkBearing} from "../src/checkLinkProperties";
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

    describe("checkBearing", function(){

        it("Checks that bearing is within target bearing when providing tolerance", function(){
            const LRPBearing = 129.375;
            const linkBearing = 120;
            const result = checkBearing(linkBearing, LRPBearing, 20);
            assert.ok(result);
        });

        it("Checks that bearing is within target bearing when not providing tolerance", function(){
            const LRPBearing = 129.375;
            const linkBearing = 120;
            const result = checkBearing(linkBearing, LRPBearing,);
            assert.ok(result);
        });

        it("Identifies that bearing is outside target bearing", function(){
            const LRPBearing = 179.375;
            const linkBearing = 120;
            const result = checkBearing(linkBearing, LRPBearing, 20);
            assert.ok(!result);
        });

        it("Checks bearings are within tolerance when the LRP bearing is greater than 180 degrees", function(){
            const LRPBearing = 270;
            const linkBearing = -90;
            const result = checkBearing(linkBearing, LRPBearing, 20);
            assert.ok(result);
        });
    });

});