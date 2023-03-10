const Flavor = require('../models/flavor');
const Plant = require('../models/plant');

const async = require('async');

// display all flavors:
exports.flavor_list = function(req, res, next) {
    Flavor.find({}, 'flavor')
        .sort({ name: 1 })
        .exec(function (err, list_flavors) {
            if (err) {
                return next(err);
            }
            res.render(
                'flavor_list',
                {
                    title: 'brassicaDB | All Flavors',
                    flavor_list: list_flavors
                }
            );
        });
}

// detail page for a specific flavor:
exports.flavor_detail = (req, res, next) => {
    async.parallel(
        {
            flavorDetail(callback) {
                Flavor.findOne({ _id: req.params.id}, 'flavor')
                    .exec(callback);
            },
            flavorPlants(callback) {
                Plant.find( { flavor: { $in: { _id: req.params.id } } } )
                    .sort({ flavor: 1 })
                    .exec(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            console.log(results.flavorPlants);
            res.render(
                'flavor_detail', 
                {
                    title: `brassicaDB | ${results.flavorDetail.flavor}`,
                    flavor_data: results.flavorDetail,
                    flavor_plants: results.flavorPlants
                }
            );
        }
    )
    
}

// display author create form on GET:
exports.flavor_create_get = (req, res) => {
    res.send('FLAVOR CREATE GET');
}

// handle author create on POST:
exports.flavor_create_post = (req, res) => {
    res.send('FLAVOR CREATE POST');
}

// display flavor delete form on GET:
exports.flavor_delete_get = (req, res) => {
    res.send('FLAVOR DELETE GET');
}

// handle flavor delete on POST:
exports.flavor_delete_post = (req, res) => {
    res.send('FLAVOR DELETE POST');
}

// display flavor update form on GET:
exports.flavor_update_get = (req, res) => {
    res.send('FLAVOR UPDATE GET');
}

// handle flavor update on POST:
exports.flavor_update_post = (req, res) => {
    res.send('FLAVOR UPDATE POST');
}