import React from 'react'
import './CardFooter.css'

import VisibilitySelector from '../VisibilitySelector/VisibilitySelector';
import AddContributer from '../AddContributer/AddContributer'
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function CardFooter(props) {
    const {handleContributeModalOpen,
        deleteNoteCard,
        noteId,
        owned,
        hiddenNoteCard,
        setHiddenPassword,
        notesHidden,hideContributer,
    hiddenPassword}=props
    
    return (
        <div class="footer">
           
            {!owned && <VisibilitySelector noteId={noteId} 
            hiddenPassword={hiddenPassword}
            setHiddenPassword={setHiddenPassword}
            notesHidden={notesHidden}
            hiddenNoteCard={hiddenNoteCard}/> }
            {!hideContributer &&  <AddContributer handleContributeModalOpen={handleContributeModalOpen} noteId={noteId}/> }
             <IconButton color="inherit" onClick={()=>{deleteNoteCard(noteId)}}>
                <Tooltip title="Add Checkbox">
                <DeleteOutlineIcon />
                </Tooltip>
             </IconButton>
        </div>
    )
}

export default CardFooter
