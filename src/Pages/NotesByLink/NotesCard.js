import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NoteModal from '../../components/OtherNotesModal/OtherNotesModal';
import ContributionModal from '../../components/ContributionModel/ContributionModal';
import bgTheme  from '../../Themes/theme'
import './NoteCard.css'
import CardFooter from '../../components/CardFooter/OtherCardFooter';
import ContentCheckbox from '../../components/ContentCheckbox/ContentCheckbox';
import axios from '../../axios'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: 'relative',
    
    minWidth: 250,
    maxWidth: 250,
    minHeight: 300,
    maxHeight:300,
    margin:"10px",
    marginBottom:"0px",
    padding: "1px",
    borderRadius: "7px",
    boxShadow: "0 1px 7px  rgb(112,112,118)",
    backgroundSize:     'cover',
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center center' ,
    transition: '0.5s',   
    opacity:"1",
    '&:hover':{
        transform: 'translateY(-30px)',
        opacity:"1",
        
        
    }
  },
  title: {
    fontSize: 12,
    height:"35px",
    color:"inherit",
    overflow: "hidden"
  },
  pos: {
    marginBottom: "0px",
    maxHeight: "180px",
    minHeight: "180px",
    color:"inherit",
    overflow: "hidden"
  },
});

export default function NotesCard(props) {
  const classes = useStyles();
  const {access,noteId,token}=props
  let history=useHistory()
  const [card,setCard]=useState(props.card)
  const mainTheme=""
  const [modalState,setModalState]=useState(true)
  const [contributeModalState,setContributeModalState]=useState(false)

  const handleModalClose=()=>{
      setModalState(false)
      console.log(card)
      if(access==="readnwrite"){
      axios.post('/contribution/updateNotesByLink',{
                Context:card.Context,
                Title:card.Title,
                Theme:card.Theme,
                id:noteId,
                token:token
              })
              .then(res=>{
                console.log(res.data)
              })
              .catch(err=>{
                console.log(err)
                history.push('/noNetwork')
              })
      }
  }
  const handleModalOpen=()=>{
     
      setModalState(true)
  }

  const handleContributeModalOpen=()=>{
      setContributeModalState(true)
  }

  const handleContributeModalClose=()=>{
      setContributeModalState(false)
     
  }

  const giveCard=(c)=>{
    setCard(c)
   
  }

  return (
      <div className={"card "+mainTheme }>
        
    <Card className={classes.root } style={{color: bgTheme[card.Theme].color, backgroundImage: `url(${bgTheme[card.Theme].bg})`,fontFamily:card.Font}}  >
        <div className="notecard" onClick={handleModalOpen}>
      <CardContent >
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         <h2 style={{color:"inherit"}}> {card.Title} </h2>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {card.Context.map(content=>{
            if(content.type==="text"){
              return(content.text)
            }
            else{
              return(
                
              <ContentCheckbox edit={false} choices={content.choices} text={content.text}/>
              )
            }
          })}
        </Typography>
        
      </CardContent>
      </div>
      <CardActions style={{padding:"0px"}}>
        <CardFooter handleContributeModalOpen={handleContributeModalOpen}
        deleteNoteCard={props.deleteNoteCard}
        noteId={noteId}
        />
      </CardActions>
    </Card>
    <NoteModal modalState={modalState} handleModalClose={handleModalClose} handleContributeModalOpen={handleContributeModalOpen} 
    card={props.card} giveCard={giveCard} 
    noteId={noteId}
    editModalCard={access==="readnwrite"?true:false}
    />
            <ContributionModal handleModalOpen={handleContributeModalOpen} handleModalClose={handleContributeModalClose} 
            modalState={contributeModalState} 
            card={props.card}
            noteId={noteId} 
            editModalCard={false}
            noUsers={true} />
    </div>
  );
}
