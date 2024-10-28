import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search from '../../assets/search.png'
import upload from '../../assets/upload.png'
import more from '../../assets/more.png'
import notification from '../../assets/notification.png'
import profile from '../../assets/jack.png'
import { Link } from 'react-router-dom'
const Navbar = ({setSidebar}) => {
  return (
    <nav className='flex-div'>
      <div className="nav-left flex-div">
        <img className='menu-icon' src={menu_icon} onClick={() => setSidebar((prev) => !prev)} alt="menu icon" />
        <Link to="/"><img className='logo' src={logo} alt="" /></Link>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder='Search' className="" />
          <img src={search} alt="" className="" />
        </div>
      </div>
      <div className="nav-right flex-div">
        <img src={upload} alt="" />
        <img src={more} alt="" />
        <img src={notification} alt="" />
        <img src={profile} className='user-icon' alt="" />
      </div>
    </nav>
  )
}

export default Navbar