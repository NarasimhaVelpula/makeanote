import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {  Fade, IconButton, Tooltip } from '@material-ui/core';
import PhotoOutlined from '@material-ui/icons/PhotoOutlined';
import themes from '../../Themes/theme'

export default function ThemeSelector(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {handleChangeTheme}=props
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (val) => {
    setAnchorEl(null);
    console.log(val)
    handleChangeTheme(val)
  };

  return (
    <div>
       <IconButton  onClick={handleClick} color="inherit">   
       <Tooltip title="Change Theme">        
                 <PhotoOutlined color="inherit" />
                 </Tooltip>
        </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
            style: {
              maxHeight: 30 * 4.5,
              width: '20ch',
            },
          }}
        TransitionComponent={Fade}
      >
          {
              Object.keys(themes).map(key=>{
                  return(
                    <MenuItem onClick={(e)=>{handleClose(key)}}>{key}</MenuItem>
                  )
              })
          }
     
        
      </Menu>
    </div>
  );
}
