import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
       
    </tr>
  );
};

const Statistics = ({ values }) => {
  const { good, bad, neutral } = values;

  let sum = good + neutral + bad;
  const calculateAverage = () => {
    return (good * 1 + neutral * 0 + bad * -1) / sum;
  };

  const calculatePositive = () => {
    const positivePercentage = (good * 100) / sum;

    return positivePercentage + "%";
  };

  if (sum === 0) {
    return <h3>No feedback given</h3>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={good + neutral + bad} />
        <StatisticLine text="Average" value={calculateAverage()} />
        <StatisticLine text="Positive" value={calculatePositive()} />
      </tbody>
    </table>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const values = {
    good,
    neutral,
    bad,
  };

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <h1>Statistics</h1>
      <Statistics values={values} />
    </>
  );
};

export default App;
