import React from 'react'
import Blog from './components/Blog'
//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <div className="App">
      <Blog blog={{ title: 'name', author:'author' }}/>
    </div>
  );
}

export default App;
