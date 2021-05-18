const { Schema } = require('mongoose');

const addressSchema = new Schema(
    {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true  
        },
        neighbourhood: {   // is there any list of neighbourhoods with standard wording? 
            type: String,
            required: false,   
        },
        province: {
            type: String,
            required: true  
        },
        postal_code: {
            type: String,
            required: true  
        }
    }
);

module.exports = addressSchema;