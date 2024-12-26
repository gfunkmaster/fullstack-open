import React from 'react'

const Content = ({name, exercises}) => {
   console.log(name)
  return (
    <div>
           <p>
          {name} -  {exercises}
        </p>
       
    </div>
  )
}

export default Content