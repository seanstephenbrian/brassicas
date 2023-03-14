const Plant = require('../models/plant');
const Cultivar = require('../models/cultivar');
const Flavor = require('../models/flavor');
const Species = require('../models/species');

const async = require('async');
const { body, validationResult } = require('express-validator');

// site welcome page:
exports.index = (req, res) => {
    async.parallel(
        {
            plantCount(callback) {
                Plant.countDocuments({}, callback);
            },
            speciesCount(callback) {
                Species.countDocuments({}, callback);
            },
            cultivarCount(callback) {
                Cultivar.countDocuments({}, callback);
            },
            flavorCount(callback) {
                Flavor.countDocuments({}, callback);
            }
        },
        (err, results) => {
            res.render('index', {
                title: 'brassicaDB - Home',
                error: err,
                data: results
            });
        }
    );
}

// display all plants:
exports.plant_list = function(req, res, next) {
    Plant.find({}, "name species cultivar description flavor in_stock")
        .sort({ name: 1 })
        .populate('species flavor cultivar')
        .exec(function (err, list_plants) {
            if (err) {
                return next(err);
            }
            list_plants.forEach(plant => {
                if (plant.cultivar.length === 1) {
                    plant.cultivar_list = plant.cultivar[0].name;
                }
                if (plant.cultivar.length === 2) {
                    plant.cultivar_list = plant.cultivar[0].name + ' x ' + plant.cultivar[1].name;
                }
            });
            res.render(
                'plant_list',
                {
                    title: 'brassicaDB | All Varieties',
                    plant_list: list_plants
                }
            );
        });
}

// detail page for a specific plant:
exports.plant_detail = function(req, res, next) {
    Plant.findOne({ _id: req.params.id}, 'name species cultivar description flavor in_stock')
        .populate('species flavor cultivar')
        .exec(function (err, plant_info) {
            if (err) {
                return next(err);
            }
            res.render(
                'plant_detail', 
                {
                    title: `brassicaDB | ${plant_info.name}`,
                    plant_data: plant_info
                }
            );
        });
}

// display author create form on GET:
exports.plant_create_get = (req, res, next) => {
    // get all species, cultivars, and flavors:
    async.parallel(
        {
            species(callback) {
                Species.find(callback);
            },
            cultivars(callback) {
                Cultivar.find(callback);
            },
            flavors(callback) {
                Flavor.find(callback)
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render('plant_form', {
                title: 'Add a New Plant to brassicaDB',
                species: results.species,
                cultivars: results.cultivars,
                flavors: results.flavors
            });
        }
    );
}

// handle author create on POST:
exports.plant_create_post = (req, res, next) => {

    // convert in_stock to boolean:
    let inStockStatus;

    if (req.body.in_stock === 'true') {
        inStockStatus = true;
    } else {
        inStockStatus = false;
    }

    // control for form submissions with no flavor specified:
    let newPlantDetails;

    if (req.body.flavor === undefined || req.body.flavor === '') {
        newPlantDetails = {
            name: req.body.name,
            species: req.body.species,
            cultivar: req.body.cultivars,
            description: req.body.description,
            in_stock: inStockStatus
        }
    } else {
        newPlantDetails = {
            name: req.body.name,
            species: req.body.species,
            cultivar: req.body.cultivars,
            description: req.body.description,
            flavor: req.body.flavor,
            in_stock: inStockStatus
        }
    }

    const newPlant = new Plant(newPlantDetails);

    newPlant.save(function(err) {
        if (err) {
            return next(err);
        }
        console.log('New Plant: ' + newPlant);
        res.redirect(newPlant.url);
    });
    
}

// display plant delete form on GET:
exports.plant_delete_get = (req, res) => {
    res.send('PLANT DELETE GET');
}

// handle plant delete on POST:
exports.plant_delete_post = (req, res) => {
    res.send('PLANT DELETE POST');
}

// display plant update form on GET:
exports.plant_update_get = (req, res) => {
    res.send('PLANT UPDATE GET');
}

// handle plant update on POST:
exports.plant_update_post = (req, res) => {
    res.send('PLANT UPDATE POST');
}