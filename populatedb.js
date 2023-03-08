#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async');

// model definitions:
const Cultivar = require('./models/cultivar');
const Flavor = require('./models/flavor');
const Plant = require('./models/plant');
const Species = require('./models/species');
const StockItem = require('./models/stockitem');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

const cultivars = [];
const flavors = [];
const plants = [];
const allSpecies = [];
const stockItems = [];

function cultivarCreate();
