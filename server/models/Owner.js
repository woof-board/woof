const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const addressSchema = require('./Address');
const dogSchema = require('./Dog');

const ownerSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must be a valid email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        admin: {
            type: Boolean,
            default: false
        },
        address: addressSchema,
        phone: {
            type: String
        },
        dogs: [dogSchema],
        status: {
            type: String,
            required: true,
            enum: ["pending_information", "active", "suspended"],
            default: "pending_information"
        },
        stripe_customer_id: {
            type: String,
            match: [/^cus_.+/, 'Must be a valid stripe customer id!']
        }
    },
    {
      toJSON: {
        getters: true
      }
    }
);

// set up pre-save middleware to create password
ownerSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
ownerSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

ownerSchema.virtual('dogCount').get(function() {
    return this.dogs.length;
});

const Owner = model('Owner', ownerSchema);

module.exports = Owner;
