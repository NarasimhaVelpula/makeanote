import { Tooltip } from '@material-ui/core'
import React from 'react'
import logo from '../components/logo.png'
import img from './404.png'
import './PageNotFound.css'
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <>
       
        <div className="PageNotFound">
        
            <div className="PageNotFoundWrapper">
                <h2><img src={logo}  width="110px" alt="logohere" />Oops! Page not found.</h2>
                <div>
                    <img src={img} alt="404" className="PageNotFoundImage" style={{background:"inherit"}}/>
                </div>
                <h3>Are you lost someone, Who is not Your's</h3>
                <p>Need help to find Your <Link to="/" ><Tooltip title="Go To Home"><button className="backButton">Path</button></Tooltip></Link></p>
            </div>
        </div>
        </>
    )
}

export default PageNotFound
