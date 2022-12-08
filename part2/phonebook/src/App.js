import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    {name : 'Arto Hellas'}
  ])

  const [newName, setNewName] = useState('');

  const addNewName = (event) => {
    console.log(event);
    event.preventDefault();
    const newObject = [
      {name : newName}
    ]
    setPersons(persons.concat(newObject));
    setNewName('');
  }

  const handleEventChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonenook</h2>

      <form onSubmit={addNewName}>
        <div>
          name : <input value={newName} onChange={handleEventChange}/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>
      <h2>Numbers</h2>
      {/* <div>debug: {newName}</div> */}
      {persons.map(person => <p key={person.name}>{person.name}</p>)}

    </div>
  )
}

export default App;
