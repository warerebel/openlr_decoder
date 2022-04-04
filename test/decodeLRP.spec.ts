import * as assert from "assert";
import {getLRP} from "../src/decodeLRP";

describe("decodeToLRP", function(){

    describe("getLRP", function(){

        it("returns the expected OpenLR LRP object", function(){
            const expected = JSON.parse("{\"openLRRef\": \"CwNhbCU+jzPLAwD0/34zGw==\", \"type\":\"RawLineLocationReference\",\"properties\":{\"_id\":\"binary\",\"_locationType\":1,\"_returnCode\":null,\"_points\":{\"type\":\"Array\",\"properties\":[{\"type\":\"LocationReferencePoint\",\"properties\":{\"_bearing\":129.375,\"_distanceToNext\":205,\"_frc\":6,\"_fow\":3,\"_lfrcnp\":6,\"_isLast\":false,\"_longitude\":4.7538936137926395,\"_latitude\":52.374883889902236,\"_sequenceNumber\":1}},{\"type\":\"LocationReferencePoint\",\"properties\":{\"_bearing\":309.375,\"_distanceToNext\":0,\"_frc\":6,\"_fow\":3,\"_lfrcnp\":7,\"_isLast\":true,\"_longitude\":4.7563336137926395,\"_latitude\":52.373583889902235,\"_sequenceNumber\":2}}]},\"_offsets\":{\"type\":\"Offsets\",\"properties\":{\"_pOffset\":0,\"_nOffset\":0,\"_version\":3,\"_pOffRelative\":0,\"_nOffRelative\":0}}}}");
            const result = getLRP("CwNhbCU+jzPLAwD0/34zGw==");
            assert.deepStrictEqual(result, expected);
        });

        it("returns an error if fed junk data", function(){
            const expected = JSON.parse("{\"openLRRef\": \"CwNhbCU+j\", \"type\": \"RawInvalidLocationReference\",\"properties\": {\"_id\": \"binary\",\"_locationType\": 0,\"_returnCode\": 4}}");
            const result = getLRP("CwNhbCU+j");
            assert.deepStrictEqual(result, expected);
        });

    });
});
