import React, { useState } from 'react'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { IconButton, Tooltip } from '@material-ui/core';
import PasswordModal from '../PasswordModal/PasswordModal';

function VisibilitySelector(props) {
    const [visibility,setVisibility]=useState(false)
    const [modalState,setModalState]=useState(false)
    const {noteId,hiddenNoteCard,hiddenPassword,setHiddenPassword,notesHidden}=props
    console.log("visibility selector",hiddenPassword)
    const handleOnClick=(e)=>{
        visibility?setVisibility(false):setVisibility(true)
        if(!props.hiddenPassword){
        handleModalOpen()
        }
        else{
            hiddenNoteCard(noteId)
        }

    }
    const handleModalOpen=()=>{
     
        setModalState(true)
    }
    const handleModalClose=()=>{
        setModalState(false)
    }
    return (
        <div>
           
                <IconButton onClick={handleOnClick} color="inherit">
                <Tooltip title={notesHidden?"unhide":"Hide"} >
                {notesHidden?<VisibilityOutlinedIcon color="inherit" />: <VisibilityOffOutlinedIcon color="inherit"/>}
                </Tooltip>
                </IconButton>
                <PasswordModal passwordModalState={modalState}
                 handlePasswordModalClose={handleModalClose}
                  noteId={noteId} 
                  hiddenNoteCard={hiddenNoteCard}
                  setHiddenPassword={setHiddenPassword}
                  />
            
        </div>
    )
}

export default VisibilitySelector
