import React from 'react'
import AccessAlarmOutlinedIcon from '@material-ui/icons/AccessAlarmOutlined';
import { IconButton, Tooltip } from '@material-ui/core';

function AddTime(props) {
    const {handleAddTime}=props
    return (
        <div>
            <IconButton color="inherit" onClick={handleAddTime}>
                    <Tooltip title="Add Time">
                        <AccessAlarmOutlinedIcon />
                    </Tooltip>
            </IconButton>
        </div>
    )
}

export default AddTime
