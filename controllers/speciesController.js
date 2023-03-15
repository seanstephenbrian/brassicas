const Species = require('../models/species');
const Plant = require('../models/plant');

const async = require('async');
const { body, validationResult } = require("express-validator");

// display all species:
exports.species_list = function(req, res, next) {
    Species.find({}, "name description")
        .sort({ name: 1 })
        .exec(function (err, list_species) {
            if (err) {
                return next(err);
            }
            res.render(
                'species_list',
                {
                    title: 'brassicaDB | All Species',
                    species_list: list_species
                }
            );
        });
}

// detail page for a specific species:
exports.species_detail = (req, res, next) => {
    async.parallel(
        {
            speciesDetail(callback) {
                Species.findOne({ _id: req.params.id }, 'name description')
                    .exec(callback);
            },
            speciesPlants(callback) {
                Plant.find( { species: { $in: { _id: req.params.id } } } )
                    .sort({ name: 1 })
                    .exec(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render(
                'species_detail',
                {
                    title: `brassicaDB | ${results.speciesDetail.name}`,
                    species_data: results.speciesDetail,
                    species_plants: results.speciesPlants
                }
            );
        }
    );
}

// display author create form on GET:
exports.species_create_get = (req, res) => {
    res.render('species_form', { title: 'Add a New Species to brassicaDB' });
}

// handle author create on POST:
exports.species_create_post = [
    // validate & sanitize:
    body('name', 'New species name required').trim().isLength({ min: 1 }).escape(),
    body('description').trim().escape(),
    //  process requests:
    (req, res, next) => {
        const errors = validationResult(req);

        const species = new Species({ name: req.body.name, description: req.body.description });

        // if there are errors, re-render the form:
        if(!errors.isEmpty()) {
            res.render(
                'species_form',
                {
                    title: 'Create a New Species',
                    species: species
                }
            );
            return;
        // otherwise if successful:
        } else {
            Species.findOne({ name: req.body.name })
                .exec((err, found_species) => {
                    if (err) {
                        return next(err);
                    }

                    if (found_species) {
                        res.redirect(found_species.url);
                    } else {
                        species.save((err) => {
                            if (err) {
                                return next(err);
                            }
                            res.redirect(species.url);
                        });
                    }
                });
        }
    }
]

// display species delete form on GET:
exports.species_delete_get = (req, res, next) => {
    Species.findById(req.params.id)
        .exec((err, found_species) => {
            if (err) {
                return next(err);
            }
            if (found_species == null) {
                res.redirect('/inventory/species-list');
            }
            res.render(
                'species_delete',
                {
                    title: 'Delete Species',
                    species: found_species
                }
            );
        });
}

// handle species delete on POST:
exports.species_delete_post = (req, res) => {
    Species.findByIdAndRemove(req.body.speciesid, (err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/inventory/species-list');
    })
}

// display species update form on GET:
exports.species_update_get = (req, res) => {
    res.send('SPECIES UPDATE GET');
}

// handle species update on POST:
exports.species_update_post = (req, res) => {
    res.send('SPECIES UPDATE POST');
}