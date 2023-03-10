#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async');

// model definitions:
const Cultivar = require('./models/cultivar');
const Flavor = require('./models/flavor');
const Plant = require('./models/plant');
const Species = require('./models/species');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

const cultivars = [];
const flavors = [];
const plants = [];
const allSpecies = [];

function cultivarCreate(cultivar_name, cultivar_species, cb) {
    const cultivarDetail = {
        name: cultivar_name,
        species: cultivar_species
    }

    const cultivar = new Cultivar(cultivarDetail);

    cultivar.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Cultivar: ' + cultivar);
        cultivars.push(cultivar);
        cb(null, cultivar);
    });
}

function flavorCreate(flavor_name, cb) {
    const flavor = new Flavor({
        flavor: flavor_name
    });

    flavor.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Flavor: ' + flavor);
        flavors.push(flavor);
        cb(null, flavor);
    });
}

function plantCreate(plant_name, plant_species, plant_cultivar, plant_description, plant_flavor, plant_in_stock, cb) {
    const plantDetail = {
        name: plant_name,
        species: plant_species,
        cultivar: plant_cultivar,
        description: plant_description,
        flavor: plant_flavor,
        in_stock: plant_in_stock
    }

    const plant = new Plant(plantDetail);

    console.log(plantDetail);
    console.log(cb);

    plant.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Plant: ' + plant);
        plants.push(plant);
        cb(null, plant);
    });
}

function speciesCreate(species_name, species_description, cb) {
    const species = new Species({
        name: species_name,
        description: species_description
    });

    species.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Species: ' + species);
        allSpecies.push(species);
        cb(null, species);
    });
}

function createSpeciesFlavors(cb) {
    async.series(
        [
            // create species:
            function(callback) {
                speciesCreate('Brassica juncea', 'Brassica juncea is a species containing a range of mustard plants. B. juncea can be divided into four major subgroups: integrifolia, juncea, napiformis, and tsatsai.', callback);
            },
            function(callback) {
                speciesCreate('Brassica oleracea', 'Brassica oleracea is a plant species that includes many common cultivars used as vegetables, such as cabbage, broccoli, cauliflower, kale, Brussels sprouts, collard greens, Savoy cabbage, kohlrabi, and gai lan. Its uncultivated form, wild cabbage, native to coastal southern and western Europe, is a hardy plant with high tolerance for salt and lime.', callback);
            },
            function(callback) {
                speciesCreate('Brassica rapa', 'Brassica rapa is a plant species grown in various widely cultivated forms including the turnip, napa cabbage, bomdong, bok choy, and rapini.', callback);
            },
            function(callback) {
                speciesCreate('Brassica napus', 'Brassica napus is a plant species cultivated mainly for its oil-rich seed, commonly known as rapeseed, which is the third-largest source of vegetable oil and the second-largest source of protein meal in the world. The root vegetable rutabaga is another cultivar of Brassica napus. The species originated as a hybrid between the cabbage (Brassica oleracea) and the turnip (Brassica rapa).', callback);
            },
            function(callback) {
                speciesCreate('Raphanus raphanistrum', 'Raphanus raphanistrum, also known as wild radish, white charlock or jointed charlock, is a flowering plant in the family Brassicaceae. One of its subspecies, Raphanus raphanistrum subsp. sativus, includes a diverse variety of cultivated radishes. The species is native to western Asia, Europe and parts of Northern Africa.', callback);
            },
            function(callback) {
                speciesCreate('Armoracia rusticana', 'Armoracia rusticana, commonly known as horseradish, is a perennial plant of the family Brassicaceae. It is a root vegetable, cultivated and used worldwide as a spice and as a condiment. The species is probably native to southeastern Europe and western Asia.', callback);
            },
            function(callback) {
                speciesCreate('Eutrema japonicum', 'Eutrema japonicum (also known as wasabi or Japanese horseradish) is a plant of the family Brassicaceae native to Japan, the Russian Far East, and the Korean Peninsula. It grows naturally along stream beds in mountain river valleys in Japan. It is grown for its rhizomes which are ground into a paste as a pungent condiment for sushi and other foods.', callback);
            },
            // create flavors:
            function(callback) {
                flavorCreate('test flavor', callback);
            }
        ],
        cb
    );
}

function createCultivars(cb) {
    async.parallel(
        [
            function(callback) {
                cultivarCreate('Integrifolia', allSpecies[0], callback); // 0
            },
            function(callback) {
                cultivarCreate('Juncea', allSpecies[0], callback); // 1
            },
            function(callback) {
                cultivarCreate('Napiformis', allSpecies[0], callback); // 2
            },
            function(callback) {
                cultivarCreate('Tsatsai', allSpecies[0], callback); // 3
            },
            function(callback) {
                cultivarCreate('Capitata', allSpecies[1], callback); // 4
            },
            function(callback) {
                cultivarCreate('Alboglabra', allSpecies[1], callback); // 5
            },
            function(callback) {
                cultivarCreate('Viridis', allSpecies[1], callback); // 6
            },
            function(callback) {
                cultivarCreate('Longata', allSpecies[1], callback); // 7
            },
            function(callback) {
                cultivarCreate('Acephala', allSpecies[1], callback); // 8
            },
            function(callback) {
                cultivarCreate('Gemmifera', allSpecies[1], callback); // 9
            },
            function(callback) {
                cultivarCreate('Costata', allSpecies[1], callback); // 10
            },
            function(callback) {
                cultivarCreate('Gongylodes', allSpecies[1], callback); // 11
            },
            function(callback) {
                cultivarCreate('Italica', allSpecies[1], callback); // 12
            },
            function(callback) {
                cultivarCreate('Botrytis', allSpecies[1], callback); // 13
            },
            function(callback) {
                cultivarCreate('Chinensis', allSpecies[2], callback); // 14
            },
            function(callback) {
                cultivarCreate('Pekinensis', allSpecies[2], callback); // 15
            },
            function(callback) {
                cultivarCreate('Oleifera', allSpecies[2], callback); // 16
            },
            function(callback) {
                cultivarCreate('Perviridis', allSpecies[2], callback); // 17
            },
            function(callback) {
                cultivarCreate('Mizuna', allSpecies[2], callback); // 18
            },
            function(callback) {
                cultivarCreate('Ruvo', allSpecies[2], callback); // 19
            },
            function(callback) {
                cultivarCreate('Narinosa', allSpecies[2], callback); // 20
            },
            function(callback) {
                cultivarCreate('Rapa', allSpecies[2], callback); // 21
            },
            function(callback) {
                cultivarCreate('Trilocularis', allSpecies[2], callback); // 22
            },
            function(callback) {
                cultivarCreate('Napus', allSpecies[3], callback); // 23
            },
            function(callback) {
                cultivarCreate('Rapifera', allSpecies[3], callback); // 24
            },
            function(callback) {
                cultivarCreate('Sativus', allSpecies[4], callback); // 25
            },
            function(callback) {
                cultivarCreate('Caudatus', allSpecies[4], callback); // 26
            },
            function(callback) {
                cultivarCreate('Longipinnatus', allSpecies[4], callback); // 27
            },
            function(callback) {
                cultivarCreate('Niger', allSpecies[4], callback); // 28
            },
            function(callback) {
                cultivarCreate('Oleiformis', allSpecies[4], callback); // 29
            },
            function(callback) {
                cultivarCreate('Raphanistroides', allSpecies[4], callback); // 30   
            }
        ],
        cb
    )
}

function createPlants(cb) {
    async.parallel(
        [
            function(callback) {
                plantCreate('Leaf mustard', allSpecies[0], [cultivars[0]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Korean red mustard', allSpecies[0], [cultivars[0]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Japanese giant red mustard', allSpecies[0], [cultivars[0]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Snow mustard', allSpecies[0], [cultivars[0]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Curled leaf mustard', allSpecies[0], [cultivars[0]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Mizuna', allSpecies[0], [cultivars[0]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Large-petiole mustard', allSpecies[0], [cultivars[0]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Horned mustard', allSpecies[0], [cultivars[0]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Head mustard', allSpecies[0], [cultivars[0]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Canola', allSpecies[0], [cultivars[1]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Root mustard', allSpecies[0], [cultivars[2]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Multishoot mustard', allSpecies[0], [cultivars[3]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Zha cai', allSpecies[0], [cultivars[3]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Wild cabbage', allSpecies[1], [cultivars[4]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Cabbage', allSpecies[1], [cultivars[4]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Savoy cabbage', allSpecies[1], [cultivars[4]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Red cabbage', allSpecies[1], [cultivars[4]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Cone cabbage', allSpecies[1], [cultivars[4]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Gai lan', allSpecies[1], [cultivars[5]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Collard greens', allSpecies[1], [cultivars[6]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Jersey cabbage', allSpecies[1], [cultivars[7]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Ornamental kale', allSpecies[1], [cultivars[8]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Kale', allSpecies[1], [cultivars[8]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Kalette', allSpecies[1], [cultivars[6], cultivars[9]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Lacinato kale', allSpecies[1], [cultivars[8]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Perpetual kale', allSpecies[1], [cultivars[8]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Tronchuda kale', allSpecies[1], [cultivars[10]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Brussels sprouts', allSpecies[1], [cultivars[9]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Kohlrabi', allSpecies[1], [cultivars[11]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Broccoli', allSpecies[1], [cultivars[12]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Cauliflower', allSpecies[1], [cultivars[13]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Caulini', allSpecies[1], [cultivars[13]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Romanesco broccoli', allSpecies[1], [cultivars[13]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Broccoli di Torbole', allSpecies[1], [cultivars[13]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Broccoflower', allSpecies[1], [cultivars[13], cultivars[12]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Broccolini', allSpecies[1], [cultivars[13], cultivars[5]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Bok choy', allSpecies[2], [cultivars[14]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Bomdong', allSpecies[2], [cultivars[15]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Choy sum', allSpecies[2], [cultivars[14]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Field mustard', allSpecies[2], [cultivars[16]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Komatsuna', allSpecies[2], [cultivars[17]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Mizuna', allSpecies[2], [cultivars[18]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Napa cabbage', allSpecies[2], [cultivars[15]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Rapini', allSpecies[2], [cultivars[19]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Tatsoi', allSpecies[2], [cultivars[20]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Turnip', allSpecies[2], [cultivars[21]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Yellow sarson', allSpecies[2], [cultivars[22]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Rapeseed', allSpecies[3], [cultivars[23]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Rutabaga', allSpecies[3], [cultivars[24]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Green radish', allSpecies[4], [cultivars[25], cultivars[26]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Daikon radish', allSpecies[4], [cultivars[25], cultivars[27]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Black radish', allSpecies[4], [cultivars[25], cultivars[28]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Oilseed radish', allSpecies[4], [cultivars[25], cultivars[29]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Wild radish', allSpecies[4], [cultivars[25], cultivars[30]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Red radish', allSpecies[4], [cultivars[25]], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Horseradish', allSpecies[5], [], 'description', [flavors[0]], true, callback);
            },
            function(callback) {
                plantCreate('Wasabi', allSpecies[6], [], 'description', [flavors[0]], true, callback);
            }
        ],
        cb
    )
}

async.series(
    [
        createSpeciesFlavors,
        createCultivars,
        createPlants
    ],
    function(err, results) {
        if (err) {
            console.log('FINAL ERROR: ' + err);
        }
        mongoose.connection.close();
    }
);