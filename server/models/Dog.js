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
            min: 0.0 // have to use some reasonable weight constraints
        },
        treats: {
            type: Boolean,
            required: true
        },
        avatar: String
    }
);

module.exports = dogSchema;