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

function cultivarCreate(cultivar_name, cultivar_description, cb) {
    cultivarDetail = {
        name: cultivar_name,
        description: cultivar_description
    }

    const cultivar = new Cultivar(cultivarDetail);

    cultivar.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Cultivar: ' + cultivar);
        cultivars.push(cultivar);
        cb(null, cultivar);
    });
}

// function createCultivars(cb) {
//     async.series([
//         function(callback) {
//             cultivarCreate('test cultivar', 'test cultivar description', callback);
//         }
//     ],
//     cb);
// }

// async.series(
//     [createCultivars],
//     function (err, results) {
//         if (err) {
//             console.log('FINAL ERR: ' + err);
//         } 
//         mongoose.connection.close();
//     }
// )