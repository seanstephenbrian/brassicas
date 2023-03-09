const Cultivar = require('../models/cultivar');

// display all cultivars:
exports.cultivar_list = (req, res) => {
    res.send('CULTIVAR LIST');
}

// detail page for a specific cultivar:
exports.cultivar_detail = (req, res) => {
    res.send(`CULTIVAR DETAIL: ${req.params.id}`);
}

// display author create form on GET:
exports.cultivar_create_get = (req, res) => {
    res.send('CULTIVAR CREATE GET');
}

// handle author create on POST:
exports.cultivar_create_post = (req, res) => {
    res.send('CULTIVAR CREATE POST');
}

// display cultivar delete form on GET:
exports.cultivar_delete_get = (req, res) => {
    res.send('CULTIVAR DELETE GET');
}

// handle cultivar delete on POST:
exports.cultivar_delete_post = (req, res) => {
    res.send('CULTIVAR DELETE POST');
}

// display cultivar update form on GET:
exports.cultivar_update_get = (req, res) => {
    res.send('CULTIVAR UPDATE GET');
}

// handle cultivar update on POST:
exports.cultivar_update_post = (req, res) => {
    res.send('CULTIVAR UPDATE POST');
}