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

Support for more backends will be added in future releases.

# Installation
Install the module with npm:

```
npm install openlr_decoder
```

Install the preferred backend driver (only mongodb currently supported):
```
npm install mongodb
```

# Example Usage
Initialise a storage connection with the chosen storage backend, the database url, and database name.

Decode an OpenLR string providing the string and any options.
```typescript
import {decodeOpenLR, initStorage, storageBackends, closeConnection} from "openlr_decoder";

async main(){

    // Backend storage connection options
    const options = {
        storageBackend: storageBackends.mongodb,
        url: "127.0.0.1:27017",
        dbName: "streetMap"
    }

    await initStorage(options);

    const result = await decodeOpenLr("C/+/+yY40CuxDAA6/WgrHw==", {targetBearing: 25, searchRadius: 100});

    await closeConnection();

}

```

# Storage Schema

The module expects data in the below described schemas for the chosen storage medium.

- [mongodb](#mongo-collection-design)

## Mongo Collection Design
The module expects the mongodb database to have a collection named "nodes" which contains only node documents. Each node should contain two arrays named startLinks and endLinks. The startLinks array contains links which start from this node and the endLinks array contains links which end at this node. A JSON schema file is provided [here](/storageSchemas/mongodb.json).

A ready to use nodes collection of OpenStreetMap data, for the UK county of Lincolnshire, is provided for download [here](/resources/lincolnshire-nodes.json.bz2). The corresponding links are also provided to allow the geometry of a full route to be identified [here](/resources/lincolnshire-links.json.bz2). 
All OpenStreetMap data is copyright [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) 
