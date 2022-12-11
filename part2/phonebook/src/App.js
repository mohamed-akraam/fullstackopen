import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    {
    name : 'Arto Hellas',
    number: '23232434343',
  }])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const addNewName = (event) => {
    event.preventDefault();
    const newObject = [
      {
      name : newName,
      number: newNumber,
    }]

    if (persons.some(person => newObject[0].name === person.name)) {
          alert(`${newObject[0].name} is already on the phonebook`);
          return newObject.slice(0);
    }

    setPersons(persons.concat(newObject));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {
    setNameFilter(e.target.value)
  }

  const NamesToShow = nameFilter ?
      persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase())) :
      persons;

  return (
    <div>
      <h2>Phonebook</h2>

     <Filter value={nameFilter} onChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm onSubmit={addNewName}
       valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} 
       onChaneNumber={handleNumberChange} 
      />

      <h3>Numbers</h3>

      <Persons persons={NamesToShow} />
    </div>
  )
}

export default App;
