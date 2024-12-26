import React from "react";
import Note from "./componenets/Notes";
import Courses from "./part1/courseinfo/Courses";

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
----------------
      <Courses />
    </div>
  );
};

export default App;
