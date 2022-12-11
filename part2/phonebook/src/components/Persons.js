const Persons = ({ persons }) => (
  <div>
    {persons.map(person => 
      <div key={person.name}>
        {<span>{person.name}</span>} {<span>{person.number}</span>}
      </div>
    )}
  </div>
)

export default Persons;