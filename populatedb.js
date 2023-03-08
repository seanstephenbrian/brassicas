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
    const cultivarDetail = {
        name: cultivar_name,
        description: cultivar_description
    }

    const cultivar = new Cultivar(cultivarDetail);

    cultivar.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Cultivar: ' + cultivar);
        cultivars.push(cultivar);
        cb(null, cultivar);
    });
}

function flavorCreate(flavor_name, flavor_description, cb) {
    const flavor = new Flavor({
        flavor: flavor_name,
        description: flavor_description
    });

    flavor.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Flavor: ' + flavor);
        flavors.push(flavor);
        cb(null, flavor);
    });
}

function plantCreate(plant_name, plant_species, plant_cultivar, plant_description, plant_flavor, plant_in_stock, cb) {
    const plantDetail = {
        name: plant_name,
        species: plant_species,
        cultivar: plant_cultivar,
        description: plant_description,
        flavor: plant_flavor,
        in_stock: plant_in_stock
    }

    const plant = new Plant(plantDetail);

    plant.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Plant: ' + plant);
        plants.push(plant);
        cb(null, plant);
    });
}

function speciesCreate(species_name, species_description, cb) {
    const species = new Species({
        name: species_name,
        description: species_description
    });

    species.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Species: ' + species);
        allSpecies.push(species);
        cb(null, species);
    });
}

function stockItemCreate(item_plant, item_organic, item_source, item_in_stock, cb) {
    const stockItemDetail = {
        plant: item_plant,
        organic: item_organic,
        source: item_source,
        in_stock: item_in_stock
    }

    const stockItem = new StockItem(stockItemDetail);
    stockItem.save(function(err) {
        if (err) {
            console.log('Error Creating Stock Item: ' + stockItem);
            cb(err, null);
            return;
        }
        console.log('New Stock Item: ' + stockItem);
        stockItems.push(stockItem);
        cb(null, stockItem);
    });
}

function createSpeciesCultivarsFlavors(cb) {
    async.series(
        [
            // create species:
            function(callback) {
                speciesCreate('Brassica juncea', 'Brassica juncea is a species containing a range of mustard plants. B. juncea can be divided into four major subgroups: integrifolia, juncea, napiformis, and tsatsai.', callback);
            },
            function(callback) {
                speciesCreate('Brassica oleracea', 'Species0 description', callback);
            },
            function(callback) {
                speciesCreate('Brassica rapa', 'Species0 description', callback);
            },
            function(callback) {
                speciesCreate('Raphanus raphanistrum', 'Species0 description', callback);
            },
            function(callback) {
                speciesCreate('Armoracia rusticana', 'Species0 description', callback);
            },
            function(callback) {
                speciesCreate('Eutrema japonicum', 'Species0 description', callback);
            },
            // create cultivars:
            function(callback) {
                cultivarCreate('Cultivar0', 'Cultivar0 description', callback);
            },
            // create flavors:
            function(callback) {
                flavorCreate('Flavor0', 'Flavor0 description', callback);
            }
        ],
        cb
    );
}

function createPlants(cb) {
    async.parallel(
        [
            function(callback) {
                plantCreate('Plant0', allSpecies[0], [cultivars[0]], 'Plant0 description', [flavors[0]], true, callback);
            }
        ],
        cb
    )
}

function createStockItems(cb) {
    async.parallel(
        [
            function(callback) {
                stockItemCreate(plants[0], true, 'Local', true, callback);
            }
        ],
        cb
    );
}

async.series(
    [
        createSpeciesCultivarsFlavors,
        createPlants,
        createStockItems
    ],
    function(err, results) {
        if (err) {
            console.log('FINAL ERROR: ' + err);
        }
        else {
            console.log('Stock Items: ' + stockItems);
        }
        mongoose.connection.close();
    }
);