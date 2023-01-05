const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('please enter the password associaated with your username');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const num = process.argv[4];


const url = `mongodb+srv://orten1:${password}@cluster1.bchnrff.mongodb.net/phonebook?retryWrites=true&w=majority`;

const phonebookScheme = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', phonebookScheme);

if (process.argv.length === 3) {
  mongoose.connect(url)
  Person
    .find({})
    .then(persons => {
      console.log('phonebook');
      persons.map(person => {
      console.log(person.name, person.number);
    });
    return mongoose.connection.close();
  })
} else if (process.argv.length === 5) {
  mongoose
  .connect(url)
  .then(res => {
    console.log('connected');
    const phonebook = new Person({
      name: name,
      number: num,
    })
    return phonebook.save();
  })
  .then(res => {
    console.log(`added ${res.name} number ${res.number} to the phonebook`);
    return mongoose.connection.close();
  })
  .catch(err => console.log(`This is an error ${err}`))

}