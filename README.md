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

Support for more backends will be added in future releases

# Installation
Install the module with npm:

```
npm install openlr_decoder
```

# Import the module
For commonjs:
```javascript
const {decodeOpenLR, initStorage} = require("openlr_decoder");
```
For typescript:
```typescript
import {decodeOpenLR, initStorage} from "openlr_decoder";
```

# Example Usage
Initialise a storage connection with the chosen storage backend, the database url, and database name.

Decode an OpenLR string providing the string and any options.
```typescript
async main(){

    await initStorage("mongodb", "mongodb://localhost:27017", "openlrdatabase");

    const result = await decodeOpenLr("C/+/+yY40CuxDAA6/WgrHw==", {targetBearing: 25, searchRadius: 100});

}

```

# Storage Schema

The module expects data in the below described schemas for the chosen storage medium.

- [mongodb](#mongo-collection-design)

## Mongo Collection Design
The module expects the mongodb database to have a collection named "nodes" which contains only node documents. Each node should contain two arrays named startLinks and endLinks. The startLinks array contains links which start from this node and the endLinks array contains links which end at this node. A JSON schema file is provided [here](/storageSchemas/mongodb.json).

A complete ready to use set of OS open roads data in this format, extracted from a MongoDB collection, is provided for download here [TODO].

A fully worked example of getting an OpenLR service up and running is provided here [TODO].
