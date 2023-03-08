const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FlavorSchema = new Schema({
    flavor: {
        type: String,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: true
    }
});

FlavorSchema.virtual('url').get(function() {
    return `/inventory/flavor/${this._id}`;
});

module.exports = mongoose.model('Flavor', FlavorSchema);