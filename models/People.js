const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please add firstname'],
    trim: true,
    maxlength: [50, 'First Name cant be more then 50 character']
  },
  lastname: {
    type: String,
    required: [true, 'Please add firstname'],
    trim: true,
    maxlength: [50, 'Desc cant be more then 50']
  },
  email: {
    type: String,
    required: [true, 'Please add email'],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please enter a valid email'
    }
},
  phone: {
    type: String,
    required: [true, "Please add phone number"],
    validate: {
      validator: function(v) {
        return /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/.test(v);
      },
      message: `{VALUE} is not a valid digit number!`
    }
  },
  address: {
    type: String,
    required: [true, 'Please add address'],
    trim: true,
    maxlength: [100, 'Address cant be more then 100']
  },
})

module.exports = mongoose.models.people || mongoose.model('people', PeopleSchema);
