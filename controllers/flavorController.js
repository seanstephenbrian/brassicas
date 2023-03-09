const Flavor = require('../models/flavor');

// display all flavors:
exports.flavor_list = (req, res) => {
    res.send('FLAVOR LIST');
}

// detail page for a specific flavor:
exports.flavor_detail = (req, res) => {
    res.send(`FLAVOR DETAIL: ${req.params.id}`);
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