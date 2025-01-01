const Note = ({ note, toggleImportance }) => {

  const label = note.important
    ? 'make not important' : 'make important'

    console.log(note.id)
    return (
      <li>
        {note.content} 
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }
  
  export default Note