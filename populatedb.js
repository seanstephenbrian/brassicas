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
                flavorCreate('Mustard', callback); // 0
            },
            function(callback) {
                flavorCreate('Peppery', callback); // 1
            },
            function(callback) {
                flavorCreate('Bitter', callback); // 2
            },
            function(callback) {
                flavorCreate('Mild', callback); // 3
            },
            function(callback) {
                flavorCreate('Sweet', callback); // 4
            },
            function(callback) {
                flavorCreate('Vegetal', callback); // 5
            },
            function(callback) {
                flavorCreate('Unpleasant', callback); // 6
            },
            function(callback) {
                flavorCreate('Earthy', callback); // 7
            },
            function(callback) {
                flavorCreate('Nutty', callback); // 8
            },
            function(callback) {
                flavorCreate('Spicy', callback); // 9
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
                plantCreate(
                    'Leaf mustard (芥菜)', 
                    allSpecies[0], 
                    [cultivars[0]], 
                    'The leaf mustard is known as "bamboo mustard", "small gai choy" (小芥菜), and "mustard cabbage".', 
                    [flavors[0]], 
                    true, 
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Korean red mustard', 
                    allSpecies[0],
                    [cultivars[0]],
                    'The mustard plant produces deep purple-red leaves with green petiole.',
                    [flavors[0]],
                    true, 
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Japanese giant red mustard',
                    allSpecies[0],
                    [cultivars[0]],
                    'The giant-leafed mustard, also known as "Japanese mustard" or "takana" (タカナ, 高菜), has purple-red savoy leaves with strong, sharp, peppery taste.', 
                    [flavors[0], flavors[1]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Snow mustard',
                    allSpecies[0],
                    [cultivars[0]],
                    'Previously identified as B. juncea var. foliosa and B. juncea subsp. integrifolia var. subintegrifolia. The mustard plant is known as "red-in-snow mustard", "green-in-snow mustard" and "xuělǐhóng / hsueh li hung".',
                    [flavors[0]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Curled leaf mustard',
                    allSpecies[0],
                    [cultivars[0]],
                    'Previously identified as B. juncea subsp. integrifolia var. crispifolia. The mustard plant is known as "curled mustard", "American mustard", "Southern mustard", "Texas mustard", and "Southern curled mustard".',
                    [flavors[0]],
                    true,
                    callback)
                ;
            },
            function(callback) {
                plantCreate(
                    'Mizuna',
                    allSpecies[0],
                    [cultivars[0]],
                    'Previously identified as B. juncea subsp. integrifolia var. japonica.',
                    [flavors[0]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Large-petiole mustard',
                    allSpecies[0],
                    [cultivars[0]],
                    '',
                    [flavors[0]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Horned mustard',
                    allSpecies[0],
                    [cultivars[0]],
                    'Previously identified as B. juncea subsp. integrifolia var. strumata. The mustard plant has a "horn" in the center of its stem, thus its name, "horned mustard".',
                    [flavors[0]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Head mustard',
                    allSpecies[0],
                    [cultivars[0]],
                    'Previously identified as B. juncea subsp. integrifolia var. rugosa. The mustard plant is known as "head mustard", "Swatow mustard", and "heart mustard", and "dai gai choy (大芥菜)".',
                    [flavors[0]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Canola',
                    allSpecies[0],
                    [cultivars[1]],
                    'Oil seed cultivars of B. juncea subsp. juncea, along with oil seed cultivars of the related species B. napus and B. rapa, are referred to as canola. Other common names include "brown mustard", "Indian mustard", and "oilseed mustard". The mustard plant is called rai or raya in India.',
                    [flavors[2]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Root mustard',
                    allSpecies[0],
                    [cultivars[2]],
                    'Previously identified as B. juncea subsp. napiformis. The mustard plant is known as "root mustard", "large-root mustard", "tuberous-root mustard", and "turnip-root mustard".',
                    [flavors[0]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Multishoot mustard',
                    allSpecies[0],
                    [cultivars[3]],
                    'Previously identified as B. juncea subsp. tsatsai var. multiceps. The mustard plant is known as "chicken mustard", "multishoot mustard", and "nine-head mustard".',
                    [flavors[0]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Zha cai',
                    allSpecies[0],
                    [cultivars[3]],
                    'Previously identified as B. juncea subsp. tsatsai var. tumida. The mustard plant with knobby, fist-sized, swollen green stem is known as "big-stem mustard" or "swollen-stem mustard".',
                    [flavors[0]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Wild cabbage',
                    allSpecies[1],
                    [cultivars[4]],
                    'Wild cabbage, native to coastal southern and western Europe, is a hardy plant with high tolerance for salt and lime. However, its intolerance of competition from other plants typically restricts its natural occurrence to limestone sea cliffs, like the chalk cliffs on both sides of the English Channel.',
                    [flavors[3], flavors[5]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Cabbage',
                    allSpecies[1],
                    [cultivars[4]],
                    'Cabbage, comprising several cultivars of Brassica oleracea, is a leafy green, red (purple), or white (pale green) biennial plant grown as an annual vegetable crop for its dense-leaved heads. It is descended from the wild cabbage (B. oleracea var. oleracea), and belongs to the "cole crops" or brassicas, meaning it is closely related to broccoli and cauliflower (var. botrytis); Brussels sprouts (var. gemmifera); and Savoy cabbage (var. sabauda). A cabbage generally weighs between 500 and 1,000 grams (1 and 2 lb).',
                    [flavors[3], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Savoy cabbage',
                    allSpecies[1],
                    [cultivars[4]],
                    'Savoy cabbage is a winter vegetable and one of several cabbage varieties. It is named after the Savoy region in France. In Italy it is also known as Milan cabbage (cavolo di Milano) or Lombard cabbage (cavolo lombardo). It has crinkled, emerald green leaves. The leaves are crunchy and tender.',
                    [flavors[3], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Red cabbage',
                    allSpecies[1],
                    [cultivars[4]],
                    'Red cabbage, also known as Blaukraut after preparation, is a purple-leaved variety of cabbage. However, the plant changes its color according to the pH value of the soil due to a pigment belonging to anthocyanins. In acidic soils, the leaves grow more reddish; in neutral soils, they will grow more purple, while an alkaline soil will produce rather greenish-yellow colored cabbages. Red cabbage is often used raw for salads and coleslaw.',
                    [flavors[3], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Cone cabbage',
                    allSpecies[1],
                    [cultivars[4]],
                    '',
                    [flavors[3], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Gai lan',
                    allSpecies[1],
                    [cultivars[5]],
                    'Jie lan, gai lan, kai-lan, Chinese broccoli, or Chinese kale (Brassica oleracea var. alboglabra) is a leafy vegetable with thick, flat, glossy blue-green leaves with thick stems, and florets similar to (but much smaller than) broccoli. The flavor is very similar to that of broccoli, but noticeably stronger and slightly more bitter.',
                    [flavors[2], flavors[4], flavors[5]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Collard greens',
                    allSpecies[1],
                    [cultivars[6]],
                    'Collard greens are grown as a food crop for their large, dark-green, edible leaves, which are cooked and eaten as vegetables, mainly in Zambia, Kashmir, Brazil, Portugal, Zimbabwe, South Africa, the American South, Tanzania, Uganda, Kenya, the Balkans, and northern Spain. Collard greens have been eaten for at least 2,000 years, with evidence showing that the ancient Greeks cultivated several types of the plant.',
                    [flavors[3], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Jersey cabbage',
                    allSpecies[1],
                    [cultivars[7]],
                    'The Jersey cabbage is a variety of cabbage native to the Channel Islands that grows to a great height and was formerly commonly used there as livestock fodder and for making walking sticks. The plant develops a long stalk, commonly reaching 6 to 10 feet (1.8 to 3.0 m) in height, and can grow as tall as 18 to 20 feet (5.5 to 6.1 m). Historically the stalks were made into walking sticks, of which 30,000 a year were being sold by the early 20th century, many for export. They were also used for fencing and as rafters.',
                    [flavors[6]],
                    false,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Ornamental kale',
                    allSpecies[1],
                    [cultivars[8]],
                    'Many varieties of kale and cabbage are grown mainly for ornamental leaves that are brilliant white, red, pink, lavender, blue, or violet in the interior of the rosette. The different types of ornamental kale are peacock kale, coral prince, kamone coral queen, color up kale, and chidori kale. Ornamental kale is as edible as any other variety, but potentially not as palatable.',
                    [flavors[6]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Kale',
                    allSpecies[1],
                    [cultivars[8]],
                    'Kale, or leaf cabbage, belongs to a group of cabbage cultivars grown for their edible leaves, although some are used as ornamentals. Kale plants have green or purple leaves, and the central leaves do not form a head (as with headed cabbage). Kales are considered to be closer to wild cabbage than most of the many domesticated forms of Brassica oleracea.',
                    [flavors[3], flavors[4], flavors[5]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Kalette',
                    allSpecies[1],
                    [cultivars[6], cultivars[9]],
                    'Kalettes (formerly known as Flower Sprouts, Petit Posy, Brukale, or Brusselkale) are a hybrid plant variety. Developed using traditional breeding techniques, they are a cross between kale and Brussels sprouts. Kalettes are highly nutritious and may be eaten raw or cooked.',
                    [flavors[3], flavors[4], flavors[5]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Lacinato kale',
                    allSpecies[1],
                    [cultivars[8]],
                    'Lacinato kale or, in Italian and often in English, cavolo nero (literally "black cabbage") is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm. Lacinato kale has been grown in Tuscany for centuries, and is one of the traditional ingredients of minestrone and ribollita.',
                    [flavors[3], flavors[4], flavors[7]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Perpetual kale',
                    allSpecies[1],
                    [cultivars[8]],
                    '',
                    [flavors[3], flavors[4], flavors[5]],
                    false,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Tronchuda kale',
                    allSpecies[1],
                    [cultivars[10]],
                    '',
                    [flavors[3], flavors[4], flavors[5]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Brussels sprouts',
                    allSpecies[1],
                    [cultivars[9]],
                    'The Brussels sprout is a member of the Gemmifera cultivar group of cabbages grown for its edible buds. The leaf vegetables are typically 1.5–4.0 cm (0.6–1.6 in) in diameter and resemble miniature cabbages. The Brussels sprout has long been popular in Brussels, Belgium, from which it gained its name.',
                    [flavors[4], flavors[7]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Kohlrabi',
                    allSpecies[1],
                    [cultivars[11]],
                    'Kohlrabi, also called German turnip or turnip cabbage, is a biennial vegetable, a low, stout cultivar of wild cabbage. It can be eaten raw or cooked. Edible preparations are made with both the stem and the leaves. The taste and texture of kohlrabi are similar to those of a broccoli stem or cabbage heart, but milder and sweeter, with a higher ratio of flesh to skin.',
                    [flavors[3], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Broccoli',
                    allSpecies[1],
                    [cultivars[12]],
                    'Broccoli is an edible green plant whose large flowering head, stalk and small associated leaves are eaten as a vegetable. It is eaten either raw or cooked. Broccoli is a particularly rich source of vitamin C and vitamin K.',
                    [flavors[3], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Cauliflower',
                    allSpecies[1],
                    [cultivars[13]],
                    'Cauliflower is an edible annual vegetable; typically, only its head is eaten – the edible white flesh is sometimes called "curd" (with a similar appearance to cheese curd). Cauliflower heads can be roasted, grilled, boiled, fried, steamed, pickled, or eaten raw. When cooking, the outer leaves and thick stalks are typically removed, leaving only the florets. The leaves are also edible but are often discarded.',
                    [flavors[4], flavors[8]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Caulini',
                    allSpecies[1],
                    [cultivars[13]],
                    'Caulini is a delicate, sweet cruciferous vegetable, also known as coralflower, which is similar to traditional cauliflower but allowed to mature longer so that its cream-colored florets separate into stems. Both the florets and green stems are edible.',
                    [flavors[4], flavors[8]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Romanesco broccoli',
                    allSpecies[1],
                    [cultivars[13]],
                    'Romanesco broccoli (also known as broccolo romanesco, romanesque cauliflower, romanesco or broccoflower) is an edible flower bud of the species Brassica oleracea, which also includes regular broccoli and cauliflower. It is chartreuse in color, and has a form naturally approximating a fractal. Romanesco broccoli has a nutty flavor and a firmer texture than regular broccoli when cooked.',
                    [flavors[4], flavors[8]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Broccoli di Torbole',
                    allSpecies[1],
                    [cultivars[13]],
                    '',
                    [flavors[4], flavors[8]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Broccoflower',
                    allSpecies[1],
                    [cultivars[13], cultivars[12]],
                    'Broccoflower is either of two edible plants of the species Brassica oleracea with light green heads. The edible portion is the immature flower head (inflorescence) of the plant.',
                    [flavors[4], flavors[8]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Broccolini',
                    allSpecies[1],
                    [cultivars[13], cultivars[5]],
                    "Broccolini, Aspabroc, or baby broccoli, is a green vegetable similar to broccoli but with smaller florets and longer, thin stalks. It is a hybrid of broccoli and gai lan and was originally developed over eight years by the Sakata Seed Company of Yokohama, Japan, to create a milder-tasting vegetable which could grow in hotter climates than broccoli, to expand Sakata's broccoli market.",
                    [flavors[3], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Bok choy',
                    allSpecies[2],
                    [cultivars[14]],
                    'Bok choy (American English, Canadian English, and Australian English), pak choi (British English) or pok choi is a type of Chinese cabbage, used as food. Chinensis varieties do not form heads and have green leaf blades with lighter bulbous bottoms instead, forming a cluster reminiscent of mustard greens. It has a flavor between spinach and water chestnuts but is slightly sweeter, with a mildly peppery undertone.',
                    [flavors[5], flavors[3], flavors[1]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Bomdong',
                    allSpecies[2],
                    [cultivars[15]],
                    'Bomdong (봄동), also known as spring cabbage, is a hardy cabbage with tough, sweet leaves. The leaves of bomdong, unlike those of regular napa cabbages, fall to the sides, giving the plant a flat shape. This cabbage is primarily used in the making of Kimchi and salads.',
                    [flavors[4], flavors[8]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Choy sum',
                    allSpecies[2],
                    [cultivars[14]],
                    'Choy sum (also spelled choi sum, choi sam in Cantonese; cai xin, caixin in Standard Mandarin) is a leafy vegetable commonly used in Chinese cuisine. Choy sum is a green leafy vegetable similar to gai lan, and can be characterized by the distinct yellow flowers which it bears.',
                    [flavors[4], flavors[0], flavors[1]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Field mustard',
                    allSpecies[2],
                    [cultivars[16]], 
                    '',
                    [flavors[0]],
                    false,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Komatsuna',
                    allSpecies[2],
                    [cultivars[17]],
                    'Komatsuna (コマツナ（小松菜）) or Japanese mustard spinach is a versatile vegetable that is cooked and eaten in many ways. It was named by Tokugawa Yoshimune, the eighth shogun of Japan, who visited Edogawa, Tokyo in 1719 for hunting and stopped at the local Katori Shrine for lunch. The shrine priest served him soup with a rice cake and a local leaf vegetable. The shogun was impressed by the flavor of the vegetable so much and named it komatsuna, after the nearby Komatsu River',
                    [flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Mizuna',
                    allSpecies[2],
                    [cultivars[18]],
                    'Mizuna (ミズナ（水菜）, "water greens"), kyona, Japanese mustard greens, or spider mustard, is a cultivar of Brassica rapa var. niposinica. Possessing dark green, serrated leaves, mizuna is described as having, when raw, a "piquant, mild peppery flavor...slightly spicy, but less so than arugula." It is used in stir-fries, soups, and nabemono (Japanese hot pots).',
                    [flavors[0], flavors[1]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Napa cabbage',
                    allSpecies[2],
                    [cultivars[15]],
                    'Napa cabbage is a type of Chinese cabbage originating near the Beijing region of China that is widely used in East Asian cuisine. The word "napa" in the name napa cabbage comes from colloquial and regional Japanese, where nappa (菜っ葉) refers to the leaves of any vegetable, especially when used as food. The word "napa" in the name napa cabbage comes from colloquial and regional Japanese, where nappa (菜っ葉) refers to the leaves of any vegetable, especially when used as food.',
                    [flavors[3], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Rapini',
                    allSpecies[2],
                    [cultivars[19]],
                    'Rapini or broccoli rabe is a green cruciferous vegetable, with the leaves, buds, and stems all being edible; the buds somewhat resemble broccoli, but do not form a large head. Rapini is known for its bitter taste, and is particularly associated with Mediterranean cuisine. Rapini is widely used in the cuisine of Rome as well Southern Italy, particularly in the regions of Sicily, Calabria, Campania, and Apulia. In Italian, rapini is called cime di rapa or broccoletti di rapa; in Naples, the green is often called friarielli. Rapini may be sautéed or braised with olive oil and garlic, and sometimes chili pepper and anchovy. In the United States, broccoli rabe is a component of some hoagies and submarine sandwiches; in Philadelphia, a popular sandwich is Italian-style roast pork with locally-made sharp provolone cheese, broccoli rabe, and peppers.',
                    [flavors[2], flavors[8]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Tatsoi',
                    allSpecies[2],
                    [cultivars[20]],
                    'Tatsoi is an Asian variety of Brassica rapa grown for greens. Also called tat choy, it is closely related to the more familiar Bok Choy. The plant has dark green spoon-shaped leaves which form a thick rosette. It has a soft creamy texture and has a subtle yet distinctive flavour.',
                    [flavors[3], flavors[4], flavors[7], flavors[8]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Turnip',
                    allSpecies[2],
                    [cultivars[21]],
                    'The turnip or white turnip is a root vegetable commonly grown in temperate climates worldwide for its white, fleshy taproot. The word turnip is a compound of turn as in turned/rounded on a lathe and neep, derived from Latin napus, the word for the plant. Small, tender varieties are grown for human consumption, while larger varieties are grown as feed for livestock. Turnip leaves are sometimes eaten as "turnip greens" ("turnip tops" in the UK), and they resemble mustard greens (to which they are closely related) in flavor.',
                    [flavors[0], flavors[3], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Yellow sarson',
                    allSpecies[2],
                    [cultivars[22]],
                    '',
                    [],
                    false,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Rapeseed',
                    allSpecies[3],
                    [cultivars[23]],
                    'Rapeseed, also known as rape, or oilseed rape, is a bright-yellow flowering member of the family Brassicaceae cultivated mainly for its oil-rich seed, which naturally contains appreciable amounts of erucic acid. Rapeseed is the third-largest source of vegetable oil and the second-largest source of protein meal in the world.',
                    [],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Rutabaga',
                    allSpecies[3],
                    [cultivars[24]],
                    'Rutabaga (North American English) or swede (British English and some Commonwealth English) is a root vegetable, a form of Brassica napus (which also includes rapeseed). Rutabaga roots are eaten as human food in various ways, and the leaves can be eaten as a leaf vegetable. The roots and tops are also used for livestock, either fed directly in the winter or foraged in the field during the other seasons. Scotland, Northern and Western England, Wales, the Isle of Man and Ireland had a tradition of carving the roots into lanterns at Halloween.',
                    [flavors[2], flavors[7]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Green radish',
                    allSpecies[4],
                    [cultivars[25], cultivars[26]],
                    '',
                    [flavors[1], flavors[9], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Daikon radish',
                    allSpecies[4],
                    [cultivars[25], cultivars[27]],
                    'Daikon or mooli is a mild-flavored winter radish usually characterized by fast-growing leaves and a long, white, napiform root. Originally native to continental East Asia, daikon is harvested and consumed throughout the region, as well as in South Asia, and is available internationally. In some locations, daikon is planted for its ability to break up compacted soils and recover nutrients but is not harvested.',
                    [flavors[1], flavors[3], flavors[4]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Black radish',
                    allSpecies[4],
                    [cultivars[25], cultivars[28]],
                    'The black radish is a root vegetable of the family Brassicaceae and is a variety of winter radish. It is also called Black Spanish radish or Erfurter radish. The edible root has a tough black skin and white flesh. There are round and elongated varieties. Like other radishes, black radish has a sharp flavor due to various chemical compounds that the plant primarily uses as pest defense.',
                    [flavors[1], flavors[2], flavors[9]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Oilseed radish',
                    allSpecies[4],
                    [cultivars[25], cultivars[29]],
                    'Oilseed radish is a type of mustard originally developed for oil production. It is widely used in Canada and is being adapted throughout Michigan as a cover crop. Oilseed radish establishes and grows quickly during cool weather. Oilseed radish has a thick, deep root that can help break up compacted soil layers and scavenge nitrate that has leached beyond the rooting zone of other crops. Like other mustards, oilseed radish is also a highly digestible forage for early and late season grazing.',
                    [],
                    false,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Wild radish',
                    allSpecies[4],
                    [cultivars[25], cultivars[30]],
                    'Wild radish (Raphanus raphanistrum) is a weed of both field crops and vegetable fields. In New York, it emerges mainly in the spring (summer annual), although in warmer regions it emerges largely in the fall and winter, and over-winters as a rosette (winter annual). Wild radish can occur in any soil type, but is most competitive in nutrient-rich and acidic sandy soils.',
                    [],
                    false,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Red radish',
                    allSpecies[4],
                    [cultivars[25]],
                    'Red radishes, botanically classified as Raphanus sativus, are peppery, crisp roots belonging to the Brassicaceae family. Red radishes have a sharp, peppery flavor well suited for fresh and cooked preparations.',
                    [flavors[1], flavors[4], flavors[9]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Horseradish',
                    allSpecies[5],
                    [],
                    'Horseradish is a perennial plant of the family Brassicaceae. It is a root vegetable, cultivated and used worldwide as a spice and as a condiment. The species is probably native to southeastern Europe and western Asia. The distinctive pungent taste of horseradish is from the compound allyl isothiocyanate.',
                    [flavors[9]],
                    true,
                    callback
                );
            },
            function(callback) {
                plantCreate(
                    'Wasabi',
                    allSpecies[6],
                    [],
                    'Wasabi (Japanese: ワサビ, わさび, or 山葵; Eutrema japonicum or Wasabia japonica) or Japanese horseradish is a plant of the family Brassicaceae native to Japan, the Russian Far East, and the Korean Peninsula. It grows naturally along stream beds in mountain river valleys in Japan. It is grown for its rhizomes which are ground into a paste as a pungent condiment for sushi and other foods. It is similar in taste to hot mustard or horseradish rather than chili peppers in that it stimulates the nose more than the tongue, but freshly grated wasabi has a subtly distinct flavor.',
                    [flavors[9]],
                    true,
                    callback
                );
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