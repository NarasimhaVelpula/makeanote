import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {  Fade, IconButton, Tooltip } from '@material-ui/core';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';


export default function FontSelector() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const fonts=['Playfair','Roboto','Raleway','Pacifico','Oswald']

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
       <IconButton  onClick={handleClick} color="inherit">      
       <Tooltip title="Change Font">     
                 <SpellcheckIcon color="inherit" />
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
              fonts.map(key=>{
                  return(
                    <MenuItem onClick={handleClose}>{key}</MenuItem>
                  )
              })
          }
     
        
      </Menu>
    </div>
  );
}
