const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlantInstanceSchema = new Schema({
    plant: {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
        required: true
    },
    organic: {
        type: Boolean,
        required: true
    },
    source: {
        type: String,
        required: true,
        enum: ['Local', 'USA', 'Imported']
    }
});

PlantInstanceSchema.virtual('url').get(function() {
    return `/inventory/plantinstance/${this._id}`;
});

module.exports = mongoose.model('PlantInstance', PlantInstanceSchema);