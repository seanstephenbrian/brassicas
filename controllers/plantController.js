const Plant = require('../models/plant');

// site welcome page:
exports.index = (req, res) => {
    res.send('HOME PAGE');
};

// display all plants:
exports.plant_list = (req, res) => {
    res.send('PLANT LIST');
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