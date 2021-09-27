import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import createImage from './create.png'
import './TitleCard.css'

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: 250,
    minHeight: 300,
    maxHeight: 300,
    margin:"10px",
    backgroundColor: "white",
    padding: "7px",
    borderRadius: "7px",
    boxShadow: "0 1px 7px  rgb(112,112,118)"
    
  },
 
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TitleCard(props) {
  const classes = useStyles();
 

  return (
    <div className="card">
    <Card className={classes.root} variant="outlined">
      <CardContent >
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Title
        </Typography>
       
        <Typography variant="body2" component="p">
            <img className="image" src={createImage} alt="createImage" onClick={props.handleModalOpen} />
            Create A New Note
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}
