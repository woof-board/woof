<<<<<<< HEAD
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const dogSchema = require('./Dog');
const mongoose = require('mongoose');
const orderSchema = new Schema({
    serviceDate: {
        type: Date,
        required: true
        // default: Date.now
=======
const { Schema, model } = require('mongoose');
const dogSchema = require('./Dog');

const orderSchema = new Schema(
    {
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
        dogs: [dogSchema]
>>>>>>> 983732b0847cf6c2a6034c55a118098497314957
    },
    {
        toJSON: {
            getters: true
        }
    }
);

orderSchema.virtual('dogCount').get(function () {
    return this.dogs.length;
});


const Order = model('Order', orderSchema);

module.exports = Order;