import React, { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

export const Anecdotes = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  //Have a random andecdote
  const nextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  // Function to handle voting
  const voteAnecdote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  // Find the anecdote with the highest votes
  const highestVotes = Math.max(...votes);
  const bestAnecdote = votes.indexOf(highestVotes);

  return (
    <>
      <div>
        <h1>Anecdotes</h1>
        <div>{anecdotes[selected]}</div>
        <div>Has {votes[selected]} votes</div>
        <button onClick={voteAnecdote}>Vote</button>
        <button onClick={nextAnecdote}>Next Anecdote</button>
      </div>
      <div>
        <h2>Anecdote with the most votes</h2>
        {highestVotes > 0 ? (
          <div>
            <div>{anecdotes[bestAnecdote]}</div>
            <div>Has {highestVotes} votes</div>
          </div>
        ) : (
          <div>No votes yet</div>
        )}
      </div>
    </>
  );
};
