import { useState } from "react";
import { Unicafe } from "./part1/unicafe/Unicafe";
import Button from "./utils /Button";
import Display from "./utils /Display";
import { Anecdotes } from "./part1/anecdotes/Anecdotes";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}



const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      {/* <Display value={value} />
      <Button handleClick={() => setToValue(value + 1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" /> */}
        <div>
          <Unicafe />
        </div>
        <div>
          <Anecdotes />
        </div>
    </div>
    
  )
}
export default App;
