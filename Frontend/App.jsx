import React, { useState } from 'react'
import NavBar from './Components/Navbar/NavBar'

const App = () => {

  const[ theme, setTheme] = useState('light');

  return (
    <div className='container'>
      <NavBar theme={theme} setTheme={setTheme}/>
    </div>
  )
}

function App(){
  console.log(window.location)
  return <NavBar />
}

export default App
