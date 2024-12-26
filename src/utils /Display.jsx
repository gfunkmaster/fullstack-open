import React from 'react'

const Display = (props) => (
    <div>
      {" "}
      {props.text} : {props.value} {props.procent}
    </div>
  );

export default Display