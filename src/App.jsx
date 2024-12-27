import React, { useState } from "react";
import Note from "./componenets/Note";
import Courses from "./part1/courseinfo/Courses";
import Notes from './componenets/Notes';
import { Phonebook } from "./part2/phonebook/Phonebook";
const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

const App = () => {
 
  return (
    <>
    <Phonebook />
   <Notes  notes={notes} />
    </>
  )
};

export default App;
