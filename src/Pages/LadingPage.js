import React from 'react'
import logo from '../components/logo.png'
import './LandingPage.css'
import cover from './cover.webp'
import {Container} from '@material-ui/core'
import FavoriteRounded from '@material-ui/icons/FavoriteRounded'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

function LadingPage() {
    const authToken=localStorage.getItem('auth-token')
    const history=useHistory()
    const logout=()=>{
        localStorage.removeItem('auth-token')
        history.push("/")
        window.location.reload(false)
    }
    return (
        <Container>
        <div className="landingPage">
            <header className="landingPage-header">
                
                <img src ={logo} className="landingpage-logo" alt="logohere" />
               <ul className="landingPage-ul">
                   <li><Link to="/">Home</Link></li>
                   {!authToken?<>
                    <li><Link to="/login">Login</Link></li>
                   <li><Link to="/register">Register</Link></li>
                   </>:
                   <>
                         <li><Link to="/updatePassword/abc" style={{textDecoration:"none"}}>Change password</Link></li>
                   <li onClick={logout}>Logout</li>
                   </>}
                  
                    
               </ul>
               
            </header>
            <div className="landingPage-content">
                <div className="landingpage-textbox">
                    <h2> Make A Note</h2>
                    <p style={{fontFamily:"papyrus",fontSize:"20px",fontWeight:"large"}}> Start writing, No matter what. The Water does not flow until the faucet is turned on!</p>
                  {authToken?<Link to="/dashboard"> <button className="LandingPageButton"> Go To Dashboard</button></Link>:<Link to="/login"> <button className="LandingPageButton"> Go To Login</button></Link>} 
                </div>
                <div class="landingPageCard">
                    <div className="imgBox"><img src={cover} alt="cover" /></div>
                    <div className="content-box">
                        <h2>Heading..</h2>
                        
                        <div style={{padding: "20px",fontFamily:"coco"}}>
                            Presenting you an awesome notes app with lots of feature, Please help to support us
                            <br />
                            <FavoriteRounded color="secondary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Container>
    )
}

export default LadingPage
