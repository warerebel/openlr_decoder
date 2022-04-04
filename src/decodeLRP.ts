import * as openlrJS from "openlr-js";

declare interface LRP {
    type: string,
    properties: {
        _bearing: number,
        _distanceToNext: number,
        _frc: number,
        _fow: number,
        _lfrcnp: number,
        isLast: boolean,
        _longitude: number,
        _latitude: number,
        _sequenceNumber: number
    }
}

declare interface LRPObject {
    openLRRef: string,
    type: string,
    properties: {
        _id: string,
        _locationType: number,
        _returnCode: number,
        _points: {
            type: string,
            properties: LRP[]
        },
        _offsets: {
            type: string,
            properties: {
                _pOffset: number,
                _nOffset: number,
                _version: number,
                _pOffRelative: number,
                _nOffRelative: number
            }
        }
    }
}

export function getLRP(openLrString: string): LRPObject{
    const binaryDecoder = new openlrJS.BinaryDecoder();
    const openLrBinary = Buffer.from(openLrString, "base64");
    const locationReference = openlrJS.LocationReference.fromIdAndBuffer("binary", openLrBinary);
    const rawLocationReference = binaryDecoder.decodeData(locationReference);
    const LRPObject = openlrJS.Serializer.serialize(rawLocationReference);
    LRPObject.openLRRef = openLrString;
    return LRPObject;
}
