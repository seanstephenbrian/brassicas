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
                    title: 'All Flavors',
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
            res.render(
                'flavor_detail', 
                {
                    title: results.flavorDetail.flavor,
                    flavor_data: results.flavorDetail,
                    flavor_plants: results.flavorPlants
                }
            );
        }
    )
    
}

// display author create form on GET:
exports.flavor_create_get = (req, res) => {
    res.render('flavor_form', { title: 'Add a New Flavor to brassicaDB' });
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
                });
        }
    }
]

// display flavor delete form on GET:
exports.flavor_delete_get = (req, res) => {
    Flavor.findById(req.params.id)
        .exec((err, found_flavor) => {
            if (err) {
                return next(err);
            }
            if (found_flavor == null) {
                res.redirect('/inventory/flavors');
            }
            res.render(
                'flavor_delete',
                {
                    title: 'Delete Flavor',
                    flavor: found_flavor
                }
            );
        });
}

// handle flavor delete on POST:
exports.flavor_delete_post = (req, res) => {
    if (req.body.password === process.env.DELETE_PW) {
        Flavor.findByIdAndRemove(req.body.flavorid, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/inventory/flavors');
        });
    } else {
        res.redirect(`/incorrect-password/flavor/${req.body.flavorid}`);
    }
}

// display flavor update form on GET:
exports.flavor_update_get = (req, res, next) => {
    Flavor.findById(req.params.id)
    .exec((err, found_flavor) => {
        if (err) {
            return next(err);
        }
        if (found_flavor == null) {
            const error = new Error('Flavor not found');
            error.status = 404;
            return next(error);
        } 
        // success.. render the form:
        res.render(
            'flavor_form',
            {
                title: 'Update Flavor',
                flavor: found_flavor
            }
        );
    });
}

// handle flavor update on POST:
exports.flavor_update_post = [
    // validate & sanitize input:
    body('flavor', 'Flavor name is required').trim().isLength({ min: 1 }).escape(),
    // process request:
    (req, res, next) => {
        const errors = validationResult(req);

        const flavor = new Flavor({
            flavor: req.body.flavor,
            _id: req.params.id
        });

        // if there are validation errors, re-render the form:
        if (!errors.isEmpty()) {
            res.render(
                'flavor_form',
                {
                    title: 'Update Flavor',
                    flavor: flavor,
                    errors: errors.array()
                }
            );
        // otherwise if successful...
        } else {
            Flavor.findByIdAndUpdate(req.params.id, flavor, {}, (err, updatedFlavor) => {
                if (err) {
                    return next(err);
                }

                // successful: redirect to flavor detail page:
                res.redirect(updatedFlavor.url);
            });
        }
    }
]