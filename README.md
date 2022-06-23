openlr_decoder
===============
[![Coverage Status](https://coveralls.io/repos/github/warerebel/openlr_decoder/badge.svg?branch=main)](https://coveralls.io/github/warerebel/openlr_decoder?branch=main)
![CodeQL Analysis](https://github.com/warerebel/openlr_decoder/actions/workflows/codeql-analysis.yml/badge.svg)
![Build and test](https://github.com/warerebel/openlr_decoder/actions/workflows/node.js.yml/badge.svg)

A general purpose OpenLR decoding solution for any suitable road network.

# Introduction
OpenLR is a dynamic location reference standard to enable systems to exchange location information in a map-agnostic manner. For further info see [OpenLR association](http://http://www.openlr.org/).
This module provides a simple and performant solution to decode an openLR reference.

# Dependencies
This module requires a mongodb database instance or an Azure Cosmos instance with support for mongodb api enabled.

Native support for Azure Cosmos will be provided in a future release.

# Installation
Install the module with npm:

```
npm install openlr_decoder
```

# Import the module
For commonjs:
```javascript
const {decodeOpenLR, initMongo} = require("openlr_decoder");
```
For typescript:
```typescript
import {decodeOpenLR, initMongo} from "openlr_decoder";
```

# Example Usage
Initialise the mongodb connection with the mongodb url and database name.

Decode an OpenLR string providing the string, the mongodb collection name to use for the nodes, and options.
```typescript
async main(){

    await initMongo("mongodb://localhost:27017", "openlrdatabase");

    const result = decodeOpenLr("C/+/+yY40CuxDAA6/WgrHw==", "nodescollection", {targetBearing: 25, searchRadius: 100});

}

```

# Mongo Collection Design
The module expects the mongodb database to have a collection which contains only node documents. Each node should contain two arrays named startLinks and endLinks. The startLinks array contains links which start from this node and the endLinks array contains links which end at this node. An example of a single node is provided below:
``` json
// Further info on each property are provided in the documentation
{
    "_id": "xyz", // A unique ID for the node
    "startLinks": [
        //array of links
        "linkid":"abcd", // unique links id
        "fow": "SC", // Link form of way
        "startnode":"xyz", // the link's start node
        "endnode":"abc", // the link's end node
        "frc": 2, // the functional road class
        "cost": 312, // The length of the link in any unit
        "bearing": 49.78040927384026 // the bearing
    ],
    "endLinks": [
        "linkid": "efgh",
        "fow": "SC",
        "startnode": "def",
        "endnode": "xyz",
        "frc": 2,
        "cost": 312,
        "bearing": 162.64822335654924
    ]
}
```
A complete ready to use set of OS open roads data in this format, extracted from a MongoDB collection, is provided for download here [TODO].

A fully worked example of getting an OpenLR service up and running is provided here [TODO].
