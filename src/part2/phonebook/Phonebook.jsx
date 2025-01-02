import React, { useState, useEffect } from "react";
import pbService from "../../services/phonebook";
import Person from "./Person";
import Notification from "../../componenets/Notification";

export const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    pbService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addNewEntry = (event) => {
    event.preventDefault();

    const newEntry = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newEntry.name.toLowerCase()
    );

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newEntry.name} is already in the phonebook. Replace the old number with the new one?`
      );

      if (confirmUpdate) {
        const updatedEntry = { ...existingPerson, number: newEntry.number };
        pbService
          .updatePerson(existingPerson.id, updatedEntry)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? updatedPerson : person
              )
            );
            setNotification({
              message: `Updated ${updatedPerson.name}'s number successfully!`,
              type: "success",
            });
            setTimeout(() => setNotification(null), 3000); // Clear notification
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              setNotification({
                message: `The person "${existingPerson.name}" was already removed from the server.`,
                type: "error",
              });
              setTimeout(() => setNotification(null), 3000);
              setPersons(persons.filter((p) => p.id !== existingPerson.id)); // Remove stale data
            } else {
              setNotification({
                message: `Failed to update ${existingPerson.name}.`,
                type: "error",
              });
              setTimeout(() => setNotification(null), 3000);
            }
          });
      }
      return;
    }

    pbService
      .createPerson(newEntry)
      .then((returnPerson) => {
        setPersons(persons.concat(returnPerson));
        setNotification({
          message: `Added ${returnPerson.name} successfully!`,
          type: "success",
        });
        setTimeout(() => setNotification(null), 3000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setNotification({
          message: `Failed to add ${newEntry.name}.`,
          type: "error",
        });
        setTimeout(() => setNotification(null), 3000);
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
    const personToDelete = persons.find((p) => p.id === id);

    if (!personToDelete) {
      alert("Person not found.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${personToDelete.name}?`
    );

    if (confirmDelete) {
      pbService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({
            message: `Deleted ${personToDelete.name} successfully!`,
            type: "success",
          });
          setTimeout(() => setNotification(null), 3000);
        })
        .catch((error) => {
          setNotification({
            message: `Failed to delete ${personToDelete.name}. They may have already been removed from the server.`,
            type: "error",
          });
          setTimeout(() => setNotification(null), 3000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
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
