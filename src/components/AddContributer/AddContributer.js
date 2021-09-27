import React, { useState } from 'react'
import { IconButton, Tooltip } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function AddContributer(props) {
    const [locked,setLocked]=useState(false)
    const handleOnClick=(e)=>{
        locked?setLocked(false):setLocked(true)
        props.handleContributeModalOpen()
    }
    return (
        <div>
           
                <IconButton onClick={handleOnClick} color="inherit">
                <Tooltip title="Add Contributer" >
               <PersonAddIcon />
                </Tooltip>
                </IconButton>
            
        </div>
    )
}

export default AddContributer
