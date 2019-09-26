import React from 'react'
const Message = ({ message }) => {
  if(message === null){
    return(
      <></>
    )
  } else{
    return(
      <div
        style={{
          border: message.type === 'error'? 'solid red 5px': 'solid green 5px',
          fontSize: '2em',
        }}
      >
        {message.message}
      </div>
    )
  }
}


export default Message