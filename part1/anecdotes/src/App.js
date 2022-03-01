import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  let newAnecdotesArray = anecdotes.map((anecdote) => ({ anecdote, vote: 0 }));

  const [selected, setSelected] = useState(0);
  const [newAnecdotes, setNewAnecdotes] = useState(newAnecdotesArray);

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const findMaxAnecdoteVotes = () => {
    const votes = newAnecdotes.map((anecdote) => anecdote.vote);
    const maxVote = Math.max(...votes);
    const targetAnecdote = newAnecdotes.find(
      (anecdote) => anecdote.vote === maxVote
    );
    return targetAnecdote;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {newAnecdotes[selected].vote} votes</p>
      <button
        onClick={() => {
          let newArray = newAnecdotes.map((anecdote, index) => {
            if (index === selected) {
              return { ...anecdote, vote: anecdote.vote + 1 };
            }
            return anecdote;
          });
          setNewAnecdotes(newArray);
        }}
      >
        Vote
      </button>
      <button onClick={generateRandomNumber}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{findMaxAnecdoteVotes().anecdote}</p>
      <p>has {findMaxAnecdoteVotes().vote} votes</p>
    </div>
  );
};

export default App;
