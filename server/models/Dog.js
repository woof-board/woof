const { Schema } = require('mongoose');

const dogSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        breed: {
            type: String,
            required: true,
            trim: true
        },
        weight: {
            type: Number,
            required: true,
            min: 0.0 
        },
        treats: {
            type: Boolean,
            required: true
        },
        avatar: {
            type: String,
            default: 'Default/nymkl8vks2eyom7rgp3f'
        },
    }
);

module.exports = dogSchema;