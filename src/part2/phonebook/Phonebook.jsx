import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import pbService from "../../services/phonebook";
import Person from "./Person";

export const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [newPerson, setNewPerson] = useState([]);

  // const getPersons = () => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       console.log(response.data)
  //       setNewPerson(response.data)
  //     })
  // }

  // useEffect(getPersons, [])

  useEffect(() => {
    pbService.getAllPersons().then((intialPersons) => {
      setPersons(intialPersons);
    });
  });

  const addNewEntry = (event) => {
    event.preventDefault();

    const newEntry = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    // Check if the person already exists in the phonebook by name
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newEntry.name.toLowerCase()
    );

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newEntry.name} is already in the phonebook. Replace the old number with the new one?`
      );

      if (confirmUpdate) {
        // Update the person's number
        const updatedEntry = { ...existingPerson, number: newEntry.number };
        pbService
          .updatePerson(existingPerson.id, updatedEntry)
          .then((updatedPerson) => {
            // Update the state with the updated person
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? updatedPerson : person
              )
            );
            setNewName(""); // Clear input fields
            setNewNumber("");
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            alert(
              `The person "${existingPerson.name}" could not be updated. They may have been removed from the server.`
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id)); // Remove stale data from state
          });
      }
      return;
    }

    // Add new entry if no duplicate is found
    pbService
      .createPerson(newEntry)
      .then((returnPerson) => {
        setPersons(persons.concat(returnPerson));
        setNewName(""); // Clear input fields
        setNewNumber("");
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
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

  const deletePerson = (id) => {
    // Find the person to delete
    const personToDelete = persons.find((p) => p.id === id);

    // Confirm deletion with the user
    if (!personToDelete) {
      alert("Person not found.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${personToDelete.name}?`
    );

    if (confirmDelete) {
      // Call the service to delete the person
      pbService
        .deletePerson(id)
        .then(() => {
          // Remove the person from the state
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          alert(
            `The person "${personToDelete.name}" was already deleted from the server.`
          );
          // Remove the stale person from the state
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        find persons:{" "}
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
      <ul>
        {showPersons.map((person) => (
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
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
