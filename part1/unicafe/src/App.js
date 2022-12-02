import { useState } from "react"

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Button = (props) => {
  return (
    <div>
      <button onClick={props.incrementGood}>good</button>
      <button onClick={props.incrementNeutral}>neutral</button>
      <button onClick={props.incrementBad}>bad</button>
    </div>
  )
}

const StatisticLine = ({ text, value, precentage }) => (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}{precentage}</td>
      </tr>
    </tbody>
)

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <StatisticLine text='good' value={props.good}/>
      <StatisticLine text='neutral' value={props.neutral}/>
      <StatisticLine text='bad' value={props.bad}/>
      <StatisticLine text='all' value={props.total}/>
      <StatisticLine text='average' value={(props.good - props.bad) / props.total}/>
      <StatisticLine text='positive' value={(props.good / props.total) * 100} precentage='%' />
    </table>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);
  const total = () => good + neutral + bad;

  return (
    <div>
      <Header text='give feedback'/>

      <Button
        incrementGood={incrementGood}
        incrementNeutral={incrementNeutral}
        incrementBad= {incrementBad}
      />

      <Header text='statistics'/>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total()}

      />
    </div>
  )
}

export default App;
