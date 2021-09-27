import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import './LockedCard.css';
import lockImage from './lock.webp'
import unlockImage from './unlock.jpg'


const useStyles = makeStyles({
  root: {
    position: 'relative',
  
    minWidth: 250,
    maxWidth: 250,
    minHeight: 300,
    maxHeight:300,
    margin:"10px",
    backgroundColor: "black",
    padding: "1px",
    borderRadius: "7px",
    boxShadow: "0 1px 7px  rgb(112,112,118)",
    backgroundSize:    'cover',
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center' ,
    backgroundImage: `url(${lockImage})`,
    transition: '0.5s',   
    opacity:"1",
    '&:hover':{
        cursor:"pointer",
        transform: 'translateY(-30px)',
        backgroundImage: `url(${unlockImage})`,
        opacity:"1",
        
    }
  },
  title: {
    fontSize: 14,
    height:"30px",
    color:"inherit",
    overflow: "hidden"
  },
  pos: {
    marginBottom: 12,
    maxHeight: "180px",
    color:"inherit",
    overflow: "hidden"
  },
});

export default function LockedCard(props) {
  const classes = useStyles();
  
  
  const mainTheme=""
  return (
      <div className={"card "+mainTheme } onClick={props.handlePasswordModalOpen}>
    <Card className={classes.root }   >
        
    </Card>
    </div>
  );
}
