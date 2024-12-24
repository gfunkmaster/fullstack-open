const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}

const App = () => {
  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Elmin' />

      <Hello name='Muharem' />
      <Hello  name='Edina'/>
      <Footer />
    </>
  )
}

export default App