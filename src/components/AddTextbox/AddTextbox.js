import React from 'react'
import TextFieldsIcon from '@material-ui/icons/TextFields';
import { IconButton, Tooltip } from '@material-ui/core';

function AddTextbox(props) {
    const {handleAddTextbox}=props
    return (
        <div>
            <IconButton color="inherit" onClick={handleAddTextbox}>
                <Tooltip title="Add Checkbox">
                    <TextFieldsIcon color="inherit" />
                </Tooltip>
            </IconButton>
        </div>
    )
}

export default AddTextbox
