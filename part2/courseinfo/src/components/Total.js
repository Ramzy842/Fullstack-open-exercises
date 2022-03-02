const Total = ({ parts }) => {
  let total = parts.reduce((acc, value) => acc + value.exercises, 0);
  return <h3>Total of {total} exercices </h3>;
};

export default Total;
