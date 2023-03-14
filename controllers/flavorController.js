const Flavor = require('../models/flavor');
const Plant = require('../models/plant');

const async = require('async');
const { body, validationResult } = require("express-validator");

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
    res.render('flavor_form', { title: 'Create a New Flavor' });
}

// handle author create on POST:
exports.flavor_create_post = [
    // validate & sanitize:
    body('flavor', 'New flavor name required').trim().isLength({ min: 1 }).escape(),
    // process requests:
    (req, res, next) => {
        const errors = validationResult(req);

        const flavor = new Flavor({ flavor: req.body.flavor });

        // if there are errors, re-render the form:
        if(!errors.isEmpty()) {
            res.render(
                'flavor_form', 
                {
                    title: 'Create a New Flavor',
                    flavor: flavor
                }
            );
            return;
        // otherwise if successful:
        } else {
            Flavor.findOne({ flavor: req.body.flavor })
                .exec((err, found_flavor) => {
                    if (err) {
                        return next(err);
                    }

                    if (found_flavor) {
                        res.redirect(found_flavor.url);
                    } else {
                        flavor.save((err) => {
                            if (err) {
                                return next(err);
                            }
                            res.redirect(flavor.url);
                        });
                    }
                }
            );
        }
    }
]

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