const { Schema, model } = require('mongoose');
const dogSchema = require('./Dog');

const orderSchema = new Schema(
    {
        service_date: {
            type: String,
            required: true
        },
        service_time: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['PENDING_WALKER', 'PENDING_PROGRESS', 'IN_PROGRESS', 'FULLFILLED', 'CHARGED', 'FINALIZED'],
            default: 'PENDING_WALKER'
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Owner'
        },
        walker: {
            type: Schema.Types.ObjectId,
            ref: 'Walker'
        },
        dogs: [{
            type: Schema.Types.ObjectId,
            ref: 'dogSchema'
        }],
        coords: {
            type: Array,
            required: false,
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

orderSchema.virtual('dog_count').get(function () {
    return this.dogs.length;
});


const Order = model('Order', orderSchema);

module.exports = Order;