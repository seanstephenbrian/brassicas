const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SpeciesSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    description: {
        type: String,
        required: true
    }
});

SpeciesSchema.virtual('url').get(function() {
    return `/inventory/species/${this._id}`;
});

module.exports = mongoose.model('Species', SpeciesSchema);