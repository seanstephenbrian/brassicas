const Plant = require('../models/plant');
const Cultivar = require('../models/cultivar');
const Flavor = require('../models/flavor');
const Species = require('../models/species');

const async = require('async');

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
            // console.log(list_plants);
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
exports.plant_detail = (req, res) => {
    res.send(`PLANT DETAIL: ${req.params.id}`);
}

// display author create form on GET:
exports.plant_create_get = (req, res) => {
    res.send('PLANT CREATE GET');
}

// handle author create on POST:
exports.plant_create_post = (req, res) => {
    res.send('PLANT CREATE POST');
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