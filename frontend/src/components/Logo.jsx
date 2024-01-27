import React from 'react'
import logoImg from "../assets/logo.png"
import 'animate.css';

const Logo = () => {
  return (
    <div className='logo-container animate__animated animate__backInDown'>
      <img src={logoImg} alt="logo" className='logo-img' />
      <div>
        <h1 className='logo-text'>Chantlo</h1>
        <p>A Private Chat</p>
      </div>
    </div>
  )
}

export default Logo
