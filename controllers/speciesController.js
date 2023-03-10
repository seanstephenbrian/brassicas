const Species = require('../models/species');

// display all species:
exports.species_list = function(req, res, next) {
    Species.find({}, "name")
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
exports.species_detail = (req, res) => {
    res.send(`SPECIES DETAIL: ${req.params.id}`);
}

// display author create form on GET:
exports.species_create_get = (req, res) => {
    res.send('SPECIES CREATE GET');
}

// handle author create on POST:
exports.species_create_post = (req, res) => {
    res.send('SPECIES CREATE POST');
}

// display species delete form on GET:
exports.species_delete_get = (req, res) => {
    res.send('SPECIES DELETE GET');
}

// handle species delete on POST:
exports.species_delete_post = (req, res) => {
    res.send('SPECIES DELETE POST');
}

// display species update form on GET:
exports.species_update_get = (req, res) => {
    res.send('SPECIES UPDATE GET');
}

// handle species update on POST:
exports.species_update_post = (req, res) => {
    res.send('SPECIES UPDATE POST');
}