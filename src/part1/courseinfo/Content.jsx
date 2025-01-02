import React from 'react'

const Content = ({name, exercises}) => {
   
  return (
    <div>
           <p>
          {name} -  {exercises}
        </p>
       
    </div>
  )
}

export default Content