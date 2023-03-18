const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(err => {
    console.log('error conecting to MongoDB', err.message);
  })

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
      validator: function(v) {
        return /\d{2,3}-\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid number. Please type a number as example {23-2432334} or {234-34534553}`
    }
  },
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedPhone) => {
    returnedPhone.id = returnedPhone._id.toString();
    delete returnedPhone._id
    delete returnedPhone.__v
  }
})

module.exports = mongoose.model('Person', phonebookSchema);

  // mongoose.connect(url)
  // Person
  //   .find({})
  //   .then(persons => {
  //     console.log('phonebook');
  //     persons.map(person => {
  //     console.log(person.name, person.number);
  //   })
  // })

  
  // mongoose
  // .connect(url)
  // .then(res => {
  //   console.log('connected');
  //   const phonebook = new Person({
  //     name: name,
  //     number: num,
  //   })
  //   return phonebook.save();
  // })
  // .then(res => {
  //   console.log(`added ${res.name} number ${res.number} to the phonebook`);
  //   return mongoose.connection.close();
  // })
  // .catch(err => console.log(`This is an error ${err}`))