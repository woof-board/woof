const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const reviewSchema = new Schema( // Do we need to add createdAt field for review? 
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Owner',
            required: true
        },
        reviewText: {
            type: String,
            required: true
        }
    }
);

const walkerSchema = new Schema(
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
        neighbourhoods: {
            type: [String],
            default: undefined
        },
        ratings: [Number],
        reviews: [reviewSchema],
        earnings: Number, // is this monthly earning? do we need to track this?
        availability: [ // placeholder, needs further discussion
            {
                date: Date,
                slot9am: Boolean,
                slot10am: Boolean,
                slot11am: Boolean,
                slot12pm: Boolean,
                slot1pm: Boolean,
                slot2pm: Boolean,
                slot3pm: Boolean,
                slot4pm: Boolean,
                slot5pm: Boolean,
            }	
        ]
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

walkerSchema.virtual('averageRating').get(function () {
    const reducer = (accumulator, currentValue, currentIndex, sourceArr) => {
        if(currentIndex === sourceArr.length - 1) {
          return parseFloat(((accumulator + currentValue) / sourceArr.length).toFixed(2));
        }else{
          return accumulator + currentValue;
        }
    }

    return this.ratings.reduce(reducer, 0);
});

const Walker = mongoose.model('Walker', walkerSchema);

module.exports = Walker;
