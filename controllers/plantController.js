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
                title: 'Home',
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
                    title: 'All Varieties',
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
                    title: `Plant Variety: ${plant_info.name}`,
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
            res.render(
                'plant_form', 
                {
                    title: 'Add a New Plant to brassicaDB',
                    species: results.species,
                    cultivars: results.cultivars,
                    flavors: results.flavors
                }
            );
        }
    );
}

// handle author create on POST:
exports.plant_create_post = (req, res, next) => {

    // convert in_stock to boolean:
    let inStockStatus;

    if (req.body.in_stock === 'true' || req.body.in_stock === true) {
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
    Plant.findById(req.params.id)
        .exec((err, found_plant) => {
            if (err) {
                return next(err);
            }
            if (found_plant == null) {
                res.redirect('/inventory/plants');
            }
            res.render(
                'plant_delete',
                {
                    title: 'Delete Plant',
                    plant: found_plant
                }
            );
        });
}

// handle plant delete on POST:
exports.plant_delete_post = (req, res) => {
    if (req.body.password === process.env.DELETE_PW) {
        Plant.findByIdAndRemove(req.body.plantid, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/inventory/plants');
        });
    } else {
        res.redirect('/incorrect-password');
    }
}

// display plant update form on GET:
exports.plant_update_get = (req, res, next) => {
    // get all species, cultivar, and flavors:
    async.parallel(
        {
            species(callback) {
                Species.find(callback);
            },
            cultivars(callback) {
                Cultivar.find(callback);
            },
            flavors(callback) {
                Flavor.find(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            Plant.findById(req.params.id)
                .exec((err, found_plant) => {
                    if (err) {
                        return next(err);
                    }
                    if (found_plant == null) {
                        const error = new Error('Plant not found');
                        error.status = 404;
                        return next(error);
                    }
                    // success... render the form:
                    res.render(
                        'plant_form',
                        {
                            title: `Updating ${found_plant.name}`,
                            plant: found_plant,
                            species: results.species,
                            cultivars: results.cultivars,
                            flavors: results.flavors
                        }
                    );
                });
        }
    )
}

// handle plant update on POST:
exports.plant_update_post = [
    // validate & sanitize input:
    body('name', 'Plant name is required').trim().isLength({ min: 1, max: 100 }).escape(),
    body('description', 'Description is required').trim().isLength({ min: 1 }).escape(),
    // process request:
    (req, res, next) => {
        const errors = validationResult(req);

        let inStockStatus;

        if (req.body.in_stock === 'true') {
            inStockStatus = true;
        } else {
            inStockStatus = false;
        }

        let updatedPlantDetails;

        if (req.body.flavor === undefined || req.body.flavor === '') {
            updatedPlantDetails = {
                name: req.body.name,
                species: req.body.species,
                cultivar: req.body.cultivars,
                description: req.body.description,
                in_stock: inStockStatus,
                _id: req.params.id
            }
        } else {
            updatedPlantDetails = {
                name: req.body.name,
                species: req.body.species,
                cultivar: req.body.cultivars,
                description: req.body.description,
                flavor: req.body.flavor,
                in_stock: inStockStatus,
                _id: req.params.id
            }
        }

        const updatedPlant = new Plant(updatedPlantDetails);

        // if there are validation errors, retrieve the species, cultivars, & flavors then re-render the form:
        if (!errors.isEmpty()) {
            async.parallel(
                {
                    species(callback) {
                        Species.find(callback);
                    },
                    cultivars(callback) {
                        Cultivar.find(callback);
                    },
                    flavors(callback) {
                        Flavor.find(callback);
                    }
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }
                    
                    // re-render the form:
                    res.render(
                        'plant_form',
                        {
                            title: 'Update Plant',
                            plant: updatedPlant,
                            species: results.species,
                            cultivars: results.cultivars,
                            flavors: results.flavors
                        }
                    );  
                }
            )
        // otherwise if successful...
        } else {
            Plant.findByIdAndUpdate(req.params.id, updatedPlant, {}, (err, updatedPlantItself) => {
                if (err) {
                    return next(err);
                }

                // successful - redirect to plant detail page:
                res.redirect(updatedPlantItself.url);
            })
        }
    }
]