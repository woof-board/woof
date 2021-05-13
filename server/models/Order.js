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