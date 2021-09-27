import React from 'react'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { IconButton, Tooltip } from '@material-ui/core';

function AddCheckbox(props) {
    const {handleAddCheckbox}=props
    return (
        <div>
            <IconButton color="inherit" onClick={handleAddCheckbox}>
                <Tooltip title="Add Checkbox">
                    <CheckBoxOutlinedIcon color="inherit" />
                </Tooltip>
            </IconButton>
        </div>
    )
}

export default AddCheckbox
