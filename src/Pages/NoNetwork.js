import { Button } from '@material-ui/core'
import React from 'react'

function NoNetwork() {
    return (
        <div>
               
 <h1 style={{
     margin:"0 auto",
     padding: "0.15em",
     fontSize:"10em",
     textShadow: "0 2px 2px #000"
 }}>⚠</h1>
    <h2 style={{
        marginBottom: "2em"
    }}>No connection to the internet</h2>
    <center>
    <p>This Website has a connection to your network but no connection to the internet.</p>
    <p style={{
        fontSize:"2em",
        margin: "1em"
    }}>We had a break up with our server, Can you please help to fix that

    </p>
    <Button variant="contained" color="secondary">Try Again</Button>
    </center>
        </div>
    )
}

export default NoNetwork
