import React, { useState } from "react";
import _ from "lodash";

export const Phonebook = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
      ]);
      const [newName, setNewName] = useState("");
      const [newNumber, setNewNumber] = useState("");
      const [filter, setFilter] = useState("");
    
      const addNewEntry = (event) => {
        event.preventDefault();
    
        // Generate a unique ID using Math.max and spread operator
        const newId = String(Math.max(...persons.map((person) => Number(person.id))) + 1);
    
        const newEntry = { name: newName, number: newNumber, id: newId };
    
        // Efficient duplicate check using `some` and deep comparison with _.isEqual
        if (persons.some((person) => _.isEqual(person, newEntry))) {
          alert(`${newName} is already added to phonebook`);
          return; // Prevent adding duplicate entries
        }
    
        setPersons([...persons, newEntry]);
        setNewName("");
        setNewNumber("");
      };
    
      const handleNameChange = (event) => {
        setNewName(event.target.value);
      };
    
      const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
      };
    
      const showPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );
    
      return (
        <div>
          <h2>Phonebook</h2>
          <div>
            find persons:{" "}
            <input value={filter} onChange={(event) => setFilter(event.target.value)} />
          </div>
          <ul>
            {showPersons.map((person) => (
              <li key={person.id}>{person.name} - {person.number}</li>
            ))}
          </ul>
          <form onSubmit={addNewEntry}>
            <div>
              name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
              number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
        </div>
      
  );
};
