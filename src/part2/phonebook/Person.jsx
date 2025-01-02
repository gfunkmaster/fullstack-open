import React from 'react'

const Person = ({person, deletePerson}) => {

    const label = "Delete Person"

  return (
    <>
           <li key={person.id}>
            {person.name} - {person.number}
            <button onClick={deletePerson}>{label}</button>
          </li>
    </>
  )
}

export default Person