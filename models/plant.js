const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    species: {
        type: Schema.Types.ObjectId,
        ref: 'Species',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    flavor: [{
        type: Schema.Types.ObjectId,
        ref: 'Flavor'
    }],
    in_stock: {
        type: Boolean,
        required: true
    }
});

PlantSchema.virtual('url').get(function() {
    return `/inventory/plant/${this._id}`;
});

module.exports = mongoose.model('Plant', PlantSchema);