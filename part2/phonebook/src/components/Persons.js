const Persons = ({ persons, onClick }) => (
  <div>
    {persons.map((person) => (
      <div key={person.name}>
        <span>{person.name}</span>
        <span>{person.number}</span>
        <button onClick={() => onClick(person.id, person.name)}>delete</button>
      </div>
    ))}
  </div>
);

export default Persons;
