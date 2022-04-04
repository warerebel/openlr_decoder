/**
 * @property startnode {string} - The start node the link connects to in a navigable graph
 * @property endnode {string} - The end node the link connects to in a navigable graph
 * @proprety linkid {string} - A unique ID for the link
 * @property bearing {number} - The bearing of travel from the start node to BEARDIST
 * @property fow {formOfWay} - The form of way of the link
 * @property cost {number} - The cost to traverse the link (generally link length in meters)
 * @property frc {frc} - The functional road class
 */
export interface nodeChildLink {
    startnode: string,
    endnode: string,
    linkid: string,
    bearing: number,
    fow: formOfWay,
    cost: number,
    frc: frc
}

declare enum formOfWay {
    Motorway = "M",
    DualCarriageway ="DC",
    SingleCarriageway = "SC",
    Roundabout = "R",
    TrafficSquare = "TS",
    SlipRoad = "SL",
    Other = "O"
}

declare enum frc {
    MainRoad = 0,
    FirstClassRoad = 1,
    SecondClassRoad = 2,
    ThirdClassRoad = 3,
    FourthClassRoad = 4,
    FifthClassRoad = 5,
    SixthClassRoad = 6,
    OtherClassRoad = 7
}

declare interface pointGeometry {
    type: string,
    coordinates: Array<number>
}

declare interface nodeProperties {
    [key: string | number | symbol]: unknown
}

/**
 * @property id {string} - A unique id for the link
 * @property properties {nodeProperties} - Properties of the node
 * @property geometry {pointGeometry} - The geometry of the node
 * @property startLinks {nodeChildLink[]} - An array of links that start from this node
 * @property endLinks {nodeChildLink[]} - An array of links that end at this node 
 */
export interface node {
    id: string,
    properties: nodeProperties,
    geometry: pointGeometry,
    startLinks: Array<nodeChildLink>
    endLinks: Array<nodeChildLink>
}

/**
 * The first key identifies a startnode it contains one property which identifies the endnode
 */
export interface linkLookup {
    [key: string]: {
        [key: string]: {
            length: number,
            linkid: string
        }
    }
}

/**
 * The first key identifies a startnode it contains one property which identifies the endnode
 */
export interface graphInput {
    [key: string]: { // start node
        [key: string]: number
    }
}
