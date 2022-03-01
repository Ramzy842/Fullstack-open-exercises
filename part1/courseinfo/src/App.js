const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <div>
      <h2>Part Name: {props.part.part}</h2>
      <p>Number of exercises: {props.part.exercise}</p>
    </div>
  );
};

const Content = (props) => {
  return props.parts.map((part, index) => {
    return <Part key={index} part={part} />;
  });
};

const Total = (props) => {
  let total = props.parts.reduce((acc, value) => acc + value.exercise, 0);
  return <h3>Total number of exercices: {total}</h3>;
};

function App() {
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        part: part1,
        exercise: exercises1,
      },
      {
        part: part2,
        exercise: exercises2,
      },
      {
        part: part3,
        exercise: exercises3,
      },
    ],
  };

  

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
