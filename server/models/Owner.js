const mongoose = require('mongoose');

const { Schema } = mongoose;

const ownerSchema = new Schema({
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

      admin:    {
        type: Boolean,
        required: true,
      },

      address: {
        type: String,
        required: true,  
      },

      city: {
        type: String,
        required: true,  
      },

      neighbourhood: {
        type: String,
        required: true,  
      },
      Prov: {
        type: String,
        required: true,  
      },
      postal_code: {
        type: String,
        required: true,  
      },
      phone: {
        type: String,
        required: true, 
      },
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
            }
          }
      ]
    
    });

    ownerSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  ownerSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  
  const Owner = mongoose.model('Owner', ownerSchema);
  
  module.exports = Owner;
  

