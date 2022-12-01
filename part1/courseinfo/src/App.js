const Header = ({ course }) => (
  <h1>{course.name}</h1>
)

const Part = ({ part, exercise }) => (
  <p>{part} {exercise}</p>
)

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts.parts[0].name} exercise={parts.parts[0].exercises} />
      <Part part={parts.parts[1].name} exercise={parts.parts[1].exercises} />
      <Part part={parts.parts[2].name} exercise={parts.parts[2].exercises} />
    </div>
  )
}

const Total = ({ sum }) => (
  <p>Number of exercises {sum.parts[0].exercises + sum.parts[1].exercises + sum.parts[2].exercises}</p>
)

function App() {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total sum={course} />
    </div>
  )
}

export default App;