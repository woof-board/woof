const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const walkerSchema = new Schema({
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
        unique: true
      },
      password: {
        type: String,
        required: true,
        minlength: 5
      },
      phone: {
        type: String,
        required: true, 
      },
      profileImg: {
        type: String,
      },
      neighbourhood: {
        type: [String],
        required: true,
      },
      rating: [Integer],
      
      review: [
        {
            type: Schema.Types.OwnerId,
            ref: review,
        },
      ],
      earning: [Number],

      availability: {
        date: {
            type: Date,
            required: true,
        },

        time: {
            type: Boolean,
            etime: ['9 am', '11 am', '1 pm', '3 pm', '5 pm'],
            default: false
        },
    
        schedule: [
            {   
                date: {
                    type: Date,
                    required: true,
                },
                time: {
                    type: String,
                    required: true,
                },
                owner: {
                    type: Schema.type.OwnerId,
                    ref: 'Owner',
                    required: true,
                },
                quantity: {                             // quantity of dogs
                    type: Number,
                    min: 0,
                    default: 0
                },
            }
          ],
          
          dogs: [
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
                    type: String,
                    required: true,
                },
                treats: {
                    type: Boolean,
                    required: true,
                },
            }
        ],

        }
        
        });
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

const Walker = mongoose.model('Walker', walkerSchema);

module.exports = Walker;
            
