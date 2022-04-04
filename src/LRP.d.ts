export interface LRP {
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

export interface LRPObject {
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
