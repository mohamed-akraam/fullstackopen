import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

import personService from "./services/numbers";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialNote) => {
      setPersons(initialNote);
    });
  }, []);

  const addNewName = (event) => {
    event.preventDefault();
    const newObject = [
      {
        name: newName,
        number: newNumber,
      },
    ];

    if (newObject[0].name === "") {
      alert("Empty name!");
      return newObject;
    }

    if (persons.some((person) => newObject[0].name === person.name)) {
      alert(`${newObject[0].name} is already on the phonebook`);
      return newObject.slice(0);
    }

    personService.create(newObject[0]).then((returnedPerson) => {

      setMessage(`Added ${returnedPerson.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      const newPerson = persons.filter((person) => person.id !== id);

      personService
        .remove(id)
        .catch(error => {
          setErrorMessage(`Information of ${name} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        
      setPersons(newPerson);
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const NamesToShow = nameFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className='alarm' message={message} />
      <Notification className='error' message={errorMessage} />

      <Filter value={nameFilter} onChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        onSubmit={addNewName}
        valueName={newName}
        onChangeName={handleNameChange}
        valueNumber={newNumber}
        onChaneNumber={handleNumberChange}
      />
      
      <button>update</button>

      <h3>Numbers</h3>

      {persons.length > 0 ? (
        <Persons persons={NamesToShow} onClick={deleteName} />
      ) : (
        "No Numbers to show"
      )}
    </div>
  );
};

export default App;
