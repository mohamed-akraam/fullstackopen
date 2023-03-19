const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((err) => {
    console.log('error conecting to MongoDB', err.message);
  });

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      // eslint-disable-next-line func-names, object-shorthand
      validator: function (v) {
        return /\d{2,3}-\d+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid number. Please type a number as example {23-2432334} or {234-34534553}`,
    },
  },
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedPhone) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    returnedPhone.id = returnedPhone._id.toString();
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedPhone._id;
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedPhone.__v;
  },
});

module.exports = mongoose.model('Person', phonebookSchema);
