import React from 'react'
import{Link} from 'react-router-dom'


function Header() {
    return(
        <header className='header'>
           <Link 
           to='/'
           className='link'> 
            <h2>Noteful</h2> 
           </Link>
        </header>
    )
}

export default Header;

