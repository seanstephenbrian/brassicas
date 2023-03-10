const Flavor = require('../models/flavor');

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
exports.flavor_detail = function(req, res, next) {
    Flavor.findOne({ _id: req.params.id}, 'flavor')
        .exec(function (err, flavor_info) {
            if (err) {
                return next(err);
            }
            console.log(flavor_info);
            res.render(
                'flavor_detail', 
                {
                    title: `brassicaDB | ${flavor_info.flavor}`,
                    flavor_data: flavor_info
                }
            );
        });
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