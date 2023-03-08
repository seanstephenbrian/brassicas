const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CultivarSchema = new Schema({
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

CultivarSchema.virtual('url').get(function() {
    return `/inventory/cultivar/${this._id}`;
});

module.exports = mongoose.model('Cultivar', CultivarSchema);