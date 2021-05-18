const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const addressSchema = require('./Address');
// const { formatDate }= require('../utils/helpers');

const reviewSchema = new Schema( 
    {
        owner_id: {
            type: Schema.Types.ObjectId,
            ref: 'Owner',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            validate: {
                
                validator: function(rating) {
                    return rating >= 1 && rating <= 5;
                },
                message: props => `${props.value} is not a valid rating number!`
            },
        },
        review_text: {
            type: String
        }
    },{
        toJSON: {
          virtuals: true
        }
    }
);

const walkerSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true
        },
        last_name: {
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
        avatar: String,
        neighbourhoods: {
            type: [String],
            default: undefined
        },
        address: addressSchema,
        reviews: [reviewSchema],
        earnings: Number,
        availability: [
            {
                // date: {
                //     type: Date,
                //     get: timestamp => formatDate(timestamp)
                // },
                date: String,
                slot9am: Boolean,
                slot11am: Boolean,
                slot1pm: Boolean,
                slot3pm: Boolean,
                slot5pm: Boolean,
                slot7pm: Boolean,
                slot9pm: Boolean
            }	
        ],
        status: {
            type: String,
            required: true,
            enum: ["PENDING_INFORMATION", "PENDING_APPROVAL", "ACTIVE", "SUSPENDED"],
            default: "PENDING_INFORMATION"
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// set up pre-save middleware to create password
walkerSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
walkerSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

walkerSchema.virtual('average_rating').get(function () {
    const reducer = (accumulator, currentValue, currentIndex, sourceArr) => {
        if(currentIndex === sourceArr.length - 1) {
          return parseFloat(((accumulator + currentValue) / sourceArr.length).toFixed(2));
        }else{
          return accumulator + currentValue;
        }
    }

    return this.reviews.map(review => review.rating).reduce(reducer, 0);
});



const Walker = model('Walker', walkerSchema);

module.exports = Walker;
