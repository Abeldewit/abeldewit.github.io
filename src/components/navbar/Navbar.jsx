import React, { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';

const Menu = () => (
  <>
  <p><a href="#home">Home</a></p>
  <p><a href="#experience">Experience</a></p>
  <p><a href="#projects">Projects</a></p>
  <p><a href="#links">Links</a></p>
  </>
)


const Navbar = () => {
  return (
    <div className='resume__navbar'>
      <div className='resume__navbar-links'>

        <div className='resume__navbar-links_logo'>
          <img src="" alt="logo"></img>
        </div>

        <div className='resume__navbar-links_container'>
          <Menu />
        </div>
      </div>
    </div>
  )
}

export default Navbar