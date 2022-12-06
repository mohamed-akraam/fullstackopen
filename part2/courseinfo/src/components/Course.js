const Header = ({ courses }) => <h1>{courses.name}</h1>

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  )
}

const Content = ({ courses }) => {

  return (
    <>
      {courses.parts.map(item => 
        <Part key={item.id} part={item.name} exercise={item.exercises} />
        )}
    </>
  )
}

const Total = ({ courses }) => {

  const sum = () => {
    return courses.parts.reduce((accumulator, current) => 
    accumulator + current.exercises, 0)
  }

  return (
    <>
      <h3>total of {sum()} exercises</h3>
    </>
  )
}


const Course = ({ courses }) => {
  return (
    <>
      {courses.map((item, i) => (
        <div key={item.id}>
          <Header courses={item} />
          <Content courses={item} />
          <Total courses={item} />
        </div>
      ))}
    </>
  )
}

export default Course;