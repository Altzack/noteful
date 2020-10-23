import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import './Header.css'




class Header extends React.Component {
  render() {
    return(
      <div className="header_container">
        <h1>
        <Link to='/'>Noteful</Link>
        </h1>
      </div>
    )
  }
}

export default Header;