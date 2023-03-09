const express = require('express');
const router = express.Router();

// controller modules:
const cultivar_controller = require('../controllers/cultivarController');
const flavor_controller = require('../controllers/flavorController');
const plant_controller = require('../controllers/plantController');
const species_controller = require('../controllers/speciesController');

// GET inventory home page:
router.get('/', plant_controller.index);

// --------------

// PLANT ROUTES:

// GET request for creating plant:
router.get('/plant/create', plant_controller.plant_create_get);

// POST request for creating book:
router.post('/plant/create', plant_controller.plant_create_post);

// GET request to delete plant:
router.get('/plant/:id/delete', plant_controller.plant_delete_get);

// POST request to delete plant:
router.post('/plant/:id/delete', plant_controller.plant_delete_post);

// GET request to update plant:
router.get('/plant/:id/update', plant_controller.plant_update_get);

// POST request to update plant:
router.post('/plant/:id/update', plant_controller.plant_update_post);

// GET request for one plant:
router.get('/plant/:id', plant_controller.plant_detail);

// GET request for all plants:
router.get('/plants', plant_controller.plant_list);

// --------------

// CULTIVAR ROUTES:

// GET request for creating cultivar:
router.get('/cultivar/create', cultivar_controller.cultivar_create_get);

// POST request for creating book:
router.post('/cultivar/create', cultivar_controller.cultivar_create_post);

// GET request to delete cultivar:
router.get('/cultivar/:id/delete', cultivar_controller.cultivar_delete_get);

// POST request to delete cultivar:
router.post('/cultivar/:id/delete', cultivar_controller.cultivar_delete_post);

// GET request to update cultivar:
router.get('/cultivar/:id/update', cultivar_controller.cultivar_update_get);

// POST request to update cultivar:
router.post('/cultivar/:id/update', cultivar_controller.cultivar_update_post);

// GET request for one cultivar:
router.get('/cultivar/:id', cultivar_controller.cultivar_detail);

// GET request for all cultivars:
router.get('/cultivars', cultivar_controller.cultivar_list);

// --------------

// FLAVOR ROUTES:

// GET request for creating flavor:
router.get('/flavor/create', flavor_controller.flavor_create_get);

// POST request for creating book:
router.post('/flavor/create', flavor_controller.flavor_create_post);

// GET request to delete flavor:
router.get('/flavor/:id/delete', flavor_controller.flavor_delete_get);

// POST request to delete flavor:
router.post('/flavor/:id/delete', flavor_controller.flavor_delete_post);

// GET request to update flavor:
router.get('/flavor/:id/update', flavor_controller.flavor_update_get);

// POST request to update flavor:
router.post('/flavor/:id/update', flavor_controller.flavor_update_post);

// GET request for one flavor:
router.get('/flavor/:id', flavor_controller.flavor_detail);

// GET request for all flavors:
router.get('/flavors', flavor_controller.flavor_list);

// --------------

// SPECIES ROUTES:

// GET request for creating species:
router.get('/species/create', species_controller.species_create_get);

// POST request for creating book:
router.post('/species/create', species_controller.species_create_post);

// GET request to delete species:
router.get('/species/:id/delete', species_controller.species_delete_get);

// POST request to delete species:
router.post('/species/:id/delete', species_controller.species_delete_post);

// GET request to update species:
router.get('/species/:id/update', species_controller.species_update_get);

// POST request to update species:
router.post('/species/:id/update', species_controller.species_update_post);

// GET request for one species:
router.get('/species/:id', species_controller.species_detail);

// GET request for all species-list:
router.get('/species-list', species_controller.species_list);

// --------------

module.exports = router;