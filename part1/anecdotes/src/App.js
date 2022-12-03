import { useState } from "react";

const Button = ({ onClick, onClick2 }) => (
  <>
    <button onClick={onClick} >vote</button>
    <button onClick={onClick2} >next anecdotes</button>
  </>
)

const Header = ({ random, vote }) => (
    <>
    <h1>Anecdote of the day</h1>
      <p>{random}</p>
      <p>has a {vote} vote</p>
    </>
  )
  
const Footer = ({ anecdotes, vote }) => {
  const highestVote = Math.max(...vote);
  const highestIndex = vote.indexOf(highestVote);
  const largestVote = anecdotes[highestIndex];

  return (
    <div>
      <p>{largestVote}</p>
      <p>has {highestVote} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));

  const newAnecdotes = () => {
    const random = () => Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }

  const handleVote = () => {
    const newVote = [...vote];
    newVote[selected] += 1;
    setVote(newVote);
  }

  return (
    <div>
      <Header random={anecdotes[selected]} vote={vote[selected]} />

      <Button onClick={handleVote}  onClick2={newAnecdotes} />
      <h1>Anecdote with most votes</h1>
      
      <Footer anecdotes={anecdotes} vote={vote} />

    </div>
  )
}

export default App;
