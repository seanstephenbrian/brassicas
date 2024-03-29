const Cultivar = require('../models/cultivar');
const Plant = require('../models/plant');
const Species = require('../models/species');

const async = require('async');
const { body, validationResult } = require("express-validator");
require('dotenv').config();

// display all cultivars:
exports.cultivar_list = function(req, res, next) {
    Cultivar.find({}, "name species")
        .sort({ name: 1 })
        .populate('species')
        .exec(function (err, list_cultivars) {
            if (err) {
                return next(err);
            }
            res.render(
                'cultivar_list',
                {
                    title: 'All Cultivars',
                    cultivar_list: list_cultivars
                }
            );
        });
}

// detail page for a specific cultivar:
exports.cultivar_detail = (req, res, next) => {
    async.parallel(
        {
            cultivarDetail(callback) {
                Cultivar.findOne({ _id: req.params.id }, 'name species')
                    .populate('species')
                    .exec(callback);
            },
            cultivarPlants(callback) {
                Plant.find( { cultivar: { $in: { _id: req.params.id } } } )
                    .sort({ name: 1 })
                    .exec(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render(
                'cultivar_detail',
                {
                    title: results.cultivarDetail.name,
                    cultivar_data: results.cultivarDetail,
                    cultivar_plants: results.cultivarPlants
                }
            );
        }
    );
}

// display cultivar create form on GET:
exports.cultivar_create_get = function(req, res, next) {
    // get list of species:
    Species.find({}, 'name')
        .populate('name')
        .exec(function (err, list_species) {
            if (err) {
                return next(err);
            }
            res.render(
                'cultivar_form', 
                {
                    title: `Add a New Cultivar to brassicaDB`,
                    species_list: list_species
                }
            );
        });
}

// handle cultivar create on POST:
exports.cultivar_create_post = [
    // validate & sanitize input field:
    body('name', 'New cultivar name required').trim().isLength({ min: 1 }).escape(),
    // process request:
    (req, res, next) => {
        const errors = validationResult(req);

        const cultivar = new Cultivar({ name: req.body.name, species: req.body.species });

        // if there are validation errors, re-render the form:
        if (!errors.isEmpty()) {
            // get the species list again:
            Species.find({}, 'name')
                .populate('name')
                .exec(function (err, list_species) {
                    if (err) {
                        return next(err);
                    }
                    res.render(
                        'cultivar_form', 
                        {
                            title: 'Create a New Cultivar',
                            cultivar,
                            species_list: list_species,
                            errors: errors.array(),
                        }
                    );
                });
            return;
        // otherwise if successful:
        } else {
            // check if cultivar with same name already exists:
            Cultivar.findOne({ name: req.body.name })
                .exec((err, found_cultivar) => {
                    if (err) {
                        return next(err);
                    }

                    // if it does, redirect to existing cultivar page:
                    if (found_cultivar) {
                        res.redirect(found_cultivar.url);
                    // if not, save new cultivar and redirect to new page:
                    } else {
                        cultivar.save((err) => {
                            if (err) {
                                return next(err);
                            }
                            res.redirect(cultivar.url);
                        });
                    }
                }
            );
        }
    }
];

// display cultivar delete form on GET:
exports.cultivar_delete_get = (req, res, next) => {
    Cultivar.findById(req.params.id)
        .exec((err, found_cultivar) => {
            if (err) {
                return next(err);
            }
            if (found_cultivar == null) {
                res.redirect('/inventory/cultivars');
            }
            res.render(
                'cultivar_delete',
                {
                    title: 'Delete Cultivar',
                    cultivar: found_cultivar
                }
            );
        });
}

// handle cultivar delete on POST:
exports.cultivar_delete_post = (req, res) => {
    if (req.body.password === process.env.DELETE_PW) {
        Cultivar.findByIdAndRemove(req.body.cultivarid, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/inventory/cultivars');
        });
    } else {
        res.redirect(`/incorrect-password/cultivar/${req.body.cultivarid}`);
    }
}

// display cultivar update form on GET:
exports.cultivar_update_get = (req, res, next) => {
    Cultivar.findById(req.params.id)
        .populate('species')
        .exec((err, found_cultivar) => {
            if (err) {
                return next(err);
            }
            if (found_cultivar == null) {
                const error = new Error('Cultivar not found');
                error.status = 404;
                return next(error);
            }
            // success.. render the form:
            Species.find({}, 'name')
                .populate('name')
                .exec(function (err, list_species) {
                    if (err) {
                        return next(err);
                    }
                    res.render(
                        'cultivar_form', 
                        {
                            title: 'Create a New Cultivar',
                            cultivar: found_cultivar,
                            species_list: list_species
                        }
                    );
                });
        });
}

// handle cultivar update on POST:
exports.cultivar_update_post = [
    // validate & sanitize input field:
    body('name', 'Cultivar name is required').trim().isLength({ min: 1 }).escape(),
    // process request:
    (req, res, next) => {
        const errors = validationResult(req);

        const cultivar = new Cultivar({ 
            name: req.body.name, 
            species: req.body.species,
            _id: req.params.id
        });

        // if there are validation errors, re-render the form:
        if (!errors.isEmpty()) {
            // get the species list again:
            Species.find({}, 'name')
                .populate('name')
                .exec(function (err, list_species) {
                    if (err) {
                        return next(err);
                    }
                    res.render(
                        'cultivar_form', 
                        {
                            title: 'Update Cultivar',
                            cultivar: cultivar,
                            species_list: list_species,
                            errors: errors.array(),
                        }
                    );
                });
            return;
        // otherwise if successful:
        } else {
            Cultivar.findByIdAndUpdate(req.params.id, cultivar, {}, (err, updatedCultivar) => {
                if (err) {
                    return next(err);
                }

                // successful: redirect to cultivar detail page:
                res.redirect(updatedCultivar.url);
            }); 
        }
    }
];