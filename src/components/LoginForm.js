import React from 'react'

const LoginForm = ({handleLogin, username, password}) => {
  const usernameProps = Object.assign({}, username)
  delete usernameProps.reset

  const passwordProps = Object.assign({}, password)
  delete passwordProps.reset

  return (
    <form onSubmit={handleLogin}>
      <h2>log into application</h2>
      <div>
        username
        <input {...usernameProps}/>
      </div>
      <div>
        password
        <input {...passwordProps}/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm