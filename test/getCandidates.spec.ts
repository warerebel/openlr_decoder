import * as sinon from "sinon";
import * as assert from "assert";
import type {LRPObject} from "../src/LRP";
import type {node} from "../src/nodes";
import {configureStorage} from "../src/storage";
import {getCandidatesForLRP} from "../src/getCandidates";

describe ("getCandidatesForLRP", function(){

    let LRP: LRPObject;
    let nodeOne: node;
    let nodeTwo: node;
    let nodeThree: node;

    before(function(){
        LRP = JSON.parse("{\"openLRRef\": \"CwNhbCU+jzPLAwD0/34zGw==\", \"type\":\"RawLineLocationReference\",\"properties\":{\"_id\":\"binary\",\"_locationType\":1,\"_returnCode\":null,\"_points\":{\"type\":\"Array\",\"properties\":[{\"type\":\"LocationReferencePoint\",\"properties\":{\"_bearing\":129.375,\"_distanceToNext\":205,\"_frc\":6,\"_fow\":3,\"_lfrcnp\":6,\"_isLast\":false,\"_longitude\":4.7538936137926395,\"_latitude\":52.374883889902236,\"_sequenceNumber\":1}},{\"type\":\"LocationReferencePoint\",\"properties\":{\"_bearing\":309.375,\"_distanceToNext\":0,\"_frc\":6,\"_fow\":3,\"_lfrcnp\":7,\"_isLast\":true,\"_longitude\":4.7563336137926395,\"_latitude\":52.373583889902235,\"_sequenceNumber\":2}}]},\"_offsets\":{\"type\":\"Offsets\",\"properties\":{\"_pOffset\":0,\"_nOffset\":0,\"_version\":3,\"_pOffRelative\":0,\"_nOffRelative\":0}}}}") as LRPObject;
        nodeOne = JSON.parse("{\"_id\":\"{E699D3DD-19C5-4705-BF19-C296FD2D429E}\",\"properties\":{\"startdate\":1645440527000,\"enddate\":1645440527000,\"nodetype\":\"P\"},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-2.0415922188313544,55.75629085059211,23.80000000000291]},\"startlinks\":[{\"startnode\":\"{E699D3DD-19C5-4705-BF19-C296FD2D429E}0\",\"endnode\":\"{D8C60BB4-49FD-4228-8197-E1085D86B0BD}0\",\"linkid\":\"{A8EF8183-7EE2-444A-9E5D-361ECCA01522}\",\"bearing\":-43.811521741038206,\"fow\":\"R\",\"cost\":31.550975062387646,\"category\":\"A\"}],\"endlinks\":[{\"startnode\":\"{261BB657-5E15-4DBC-A5A9-2E848562EBA7}0\",\"endnode\":\"{E699D3DD-19C5-4705-BF19-C296FD2D429E}0\",\"linkid\":\"{3A6D6539-7C26-4FF9-ACEE-6D35DA6FCC63}\",\"bearing\":89.96548766181236,\"fow\":\"R\",\"cost\":15.670548092920543,\"category\":\"A\"}]}") as node;
        nodeTwo = JSON.parse("{\"_id\":\"{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}\",\"properties\":{\"startdate\":1645440527000,\"enddate\":1645440527000,\"nodetype\":\"J\"},\"geometry\":{\"type\":\"Point\",\"coordinates\":[0.05361016083511167,50.85371429478068,9]},\"startlinks\":[{\"startnode\":\"{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0\",\"endnode\":\"{0436F360-42B4-42D8-833C-682B36BF5972}0\",\"linkid\":\"{D80DA8F6-1764-4F61-ADCD-9EBCF56A698C}\",\"bearing\":-75.94041883295594,\"fow\":\"SC\",\"cost\":37.9724436052552,\"category\":\"A\"},{\"endnode\":\"{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0\",\"startnode\":\"{0436F360-42B4-42D8-833C-682B36BF5972}0\",\"bearing\":97.86667010731368,\"fow\":\"SC\",\"cost\":37.9724436052552,\"category\":\"A\"}],\"endlinks\":[{\"startnode\":\"{B663524B-C64C-4667-9E9F-A64F6CE12D14}0\",\"endnode\":\"{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0\",\"linkid\":\"{411B80F3-B587-43AC-A249-67DA8FE806A5}\",\"bearing\":-50.66621117128134,\"fow\":\"SC\",\"cost\":42.95290960683482,\"category\":\"A\"},{\"endnode\":\"{B663524B-C64C-4667-9E9F-A64F6CE12D14}0\",\"startnode\":\"{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0\",\"linkid\":\"{411B80F3-B587-43AC-A249-67DA8FE806A5}\",\"bearing\":131.7309267493855,\"fow\":\"SC\",\"cost\":42.95290960683482,\"category\":\"A\"},{\"startnode\":\"{1212935A-2E97-4067-AF27-7D62927AD7FF}0\",\"endnode\":\"{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0\",\"linkid\":\"{B23BD004-3288-46A7-AF33-9EC352021DD7}\",\"bearing\":113.89872413984318,\"fow\":\"SC\",\"cost\":28.395979662872904,\"category\":\"A\"},{\"endnode\":\"{1212935A-2E97-4067-AF27-7D62927AD7FF}0\",\"startnode\":\"{D61C07C8-5839-4EA1-A0A6-723A224B8BFA}0\",\"linkid\":\"{B23BD004-3288-46A7-AF33-9EC352021DD7}\",\"bearing\":-67.79008194744122,\"fow\":\"SC\",\"cost\":28.395979662872904,\"category\":\"A\"}]}") as node;
        nodeThree = JSON.parse("{\"_id\":\"{86B58579-3B3D-48CD-B929-D94DFC2F473E}\",\"properties\":{\"startdate\":1645440527000,\"enddate\":1645440527000,\"nodetype\":\"J\"},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-0.4326955645365233,54.2003102674229,36.80000000000291]},\"startlinks\":[{\"startnode\":\"{86B58579-3B3D-48CD-B929-D94DFC2F473E}0\",\"endnode\":\"{25EEC8F5-795D-44E7-9055-C6B04C438044}0\",\"linkid\":\"{3D047D72-CEAE-4FB9-8FAF-A51B43F8E93A}\",\"bearing\":54.338799865248696,\"fow\":\"SC\",\"cost\":10.497140563029534,\"category\":\"A\"},{\"endnode\":\"{86B58579-3B3D-48CD-B929-D94DFC2F473E}0\",\"startnode\":\"{25EEC8F5-795D-44E7-9055-C6B04C438044}0\",\"bearing\":-125.66109905468129,\"fow\":\"SC\",\"cost\":10.497140563029534,\"category\":\"A\"},{\"startnode\":\"{86B58579-3B3D-48CD-B929-D94DFC2F473E}0\",\"endnode\":\"{130EA2A3-8E1B-4200-8321-04F9BEA0FCFC}0\",\"linkid\":\"{DA351B0C-450F-4AD4-B4F8-945468F76028}\",\"bearing\":-129.39483267123745,\"fow\":\"SC\",\"cost\":8.542570026786029,\"category\":\"A\"},{\"endnode\":\"{86B58579-3B3D-48CD-B929-D94DFC2F473E}0\",\"startnode\":\"{130EA2A3-8E1B-4200-8321-04F9BEA0FCFC}0\",\"bearing\":50.60507867659391,\"fow\":\"SC\",\"cost\":8.542570026786029,\"category\":\"A\"}],\"endlinks\":[{\"startnode\":\"{5D7C7EAC-53CE-4602-8089-A36CC230188E}0\",\"endnode\":\"{86B58579-3B3D-48CD-B929-D94DFC2F473E}0\",\"linkid\":\"{129378BB-B861-4895-BA42-3A8AD7CB4193}\",\"bearing\":-100.06137664993575,\"fow\":\"SC\",\"cost\":4.458847541335493,\"category\":\"A\"},{\"endnode\":\"{5D7C7EAC-53CE-4602-8089-A36CC230188E}0\",\"startnode\":\"{86B58579-3B3D-48CD-B929-D94DFC2F473E}0\",\"linkid\":\"{129378BB-B861-4895-BA42-3A8AD7CB4193}\",\"bearing\":79.93856093462159,\"fow\":\"SC\",\"cost\":4.458847541335493,\"category\":\"A\"}]}");
        const findStub = sinon.stub(configureStorage, "findNodesNearPoint").onCall(0).resolves([nodeOne]);
        findStub.onCall(1).resolves([nodeTwo, nodeThree]);
    });

    after(function(){
        sinon.restore();
    });

    it("Returns candidate nodes for a query", async function(){
        const result = await getCandidatesForLRP(LRP as LRPObject);
        assert.deepStrictEqual(result[0], [nodeOne]);
        assert.deepStrictEqual(result[1], [nodeTwo, nodeThree]);
    });

});
