import React from 'react'
import logo from '../logo.png'
import './Header.css'
import DirectionsRunRoundedIcon from '@material-ui/icons/DirectionsRunRounded';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Header() {
    let location=useHistory()
    const logout=()=>{
        localStorage.removeItem('auth-token')
        location.push("/")
    }
    return (
        <div className="header">
            <Link to="/">           <img className="logo" src={logo} alt="logo" />
            </Link>
 
           <IconButton onClick={logout}> <DirectionsRunRoundedIcon fontSize="large"/>Logout</IconButton>
        </div>
    )
}

export default Header
