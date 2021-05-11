const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const dogSchema = require('./Dog');

const orderSchema = new Schema({
    serviceDate: {
        type: Date,
        required: true
        // default: Date.now
    },
    serviceTime: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    },
    walker: {
        type: Schema.Types.ObjectId,
        ref: 'Walker'
    },
    dogs: [dogSchema] // placeholder item: needs more thinking 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;