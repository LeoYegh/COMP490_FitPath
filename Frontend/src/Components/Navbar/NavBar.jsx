import React from 'react'
import './NavBar.css'
import light_logo from '../../assets/daylogotemp.png'
import dark_logo from '../../assets/nightlogotemp.png'
import search_icon_light from '../../assets/search-w.png'
import search_icon_dark from '../../assets/search-b.png'
import toggle_light from '../../assets/night.png'
import toggle_dark from '../../assets/day.png'

const NavBar = ({theme, setTheme}) => {

  const toggle_mode = ()=>{
    theme =='light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <div className='navbar'>
        
        <img src={theme == 'light' ? light_logo: dark_logo} 
        alt="" className='logo'/>
        
        <ul>
            <li>Home</li>
            <li>MacroTracker</li>
            <li>AboutUs</li>
            <li>SleepPage</li>
            <li>Other</li>
        </ul>

        <div className='search-box'>
            <input type ='text' placeholder='Search'/>
            <img src={search_icon_light} alt=""/>
        </div>

        <img onClick={()=>{toggle_mode}} src={toggle_light} alt=""
        className='toggle_icon'/>
    </div>
  )
}

export default NavBar
