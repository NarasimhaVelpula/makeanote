import React, { Component } from 'react'
import PatternLock          from "react-pattern-lock";

export class PatternLocker extends Component {
    constructor(){
        this.state={
            path:[]
        }
    }
    render() {
        return (
            <PatternLock
           path={[1,2,3,4]}
        />
        )
    }
}

export default PatternLock
