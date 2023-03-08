const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockItemSchema = new Schema({
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
    },
    in_stock: {
        type: Boolean,
        required: true
    }
});

StockItemSchema.virtual('url').get(function() {
    return `/inventory/stockitem/${this._id}`;
});

module.exports = mongoose.model('StockItem', StockItemSchema);