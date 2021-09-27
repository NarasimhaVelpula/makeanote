import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './NoteModal.css'
import { Button, TextareaAutosize } from '@material-ui/core';
import bgTheme  from '../../Themes/theme'
import ContentCheckbox from '../ContentCheckbox/ContentCheckbox';
import ModalCardFooter from '../CardFooter/ModalCardFooter';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'start',
    marginTop:"30px",
    justifyContent: 'center',
    
    
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: "10px 17px",
    borderRadius: "7px",
    boxShadow: "0 1px 7px  rgb(112,112,118)",
    

    width:"50%",
    backgroundSize:     'cover',
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center center' ,             
    
    
  },
  
}));

export default function NoteModal(props) {
  const classes = useStyles();
  const {modalState,handleModalClose,handleContributeModalOpen,
    hideContributer,
    notesHidden,giveCard,noteId}=props
  const [card,setCard]=useState(props.card)
  const [activeElement,setActiveElement]=useState({ContentId:null,OptionId:null,title:false})
  const [open, setOpen] = useState(modalState);
  const selectedTheme=card.Theme
  const font="roboto"
  

  
  
  
  const handleClose = () => {
    handleModalClose()
  };

  const handleTitleChange=(e)=>{
    let newCard={...card}
    newCard.Title=e.target.value
    props.card.title=e.target.value
    
   
    giveCard(newCard)
    //setCard(newCard)
    setCard(newCard)
    console.log(newCard)
    console.log(card)
    
  }

  const handleContentTextChange=(id,e)=>{
    let newCard={...card}
    newCard.Context[id].text=e.target.value
    giveCard(newCard)
    setCard(newCard)
  }

  const handleContextCheckboxChange=(id,text,choices)=>{
    console.log(choices)
    let newCard={...card}
    newCard.Context[id].text=text
    newCard.Context[id].choices=choices
    
    giveCard(newCard)
    setCard(newCard)
  }

  const handleChangeTheme=(theme)=>{
    let newCard={...card}
    newCard.Theme=theme
    
    giveCard(newCard)
    setCard(newCard)
  }

  const addTime=()=>{
    let newCard={...card}
    let d=Date()
    let dd=d.substring(0,24)
    console.log(activeElement)
    if(activeElement.title){
      console.log(newCard.Title+" "+dd )
      newCard.Title=newCard.Title+" "+dd
      
      giveCard(newCard)
      setCard(newCard)
    }
    else if(activeElement.OptionId===null){
      console.log(activeElement.ContentId)
      if(activeElement.ContentId>=0){
      newCard.Context[activeElement.ContentId].text=newCard.Context[activeElement.ContentId].text+" "+dd
      
      giveCard(newCard)
      setCard(newCard)
      }
    }
    else{

    }
  }

  useEffect(()=>{
    setOpen(modalState)
    
  
},[modalState])

  const addCheckbox=()=>{
    let newCard={...card}
    newCard.Context.push({
      type:"checkbox",
      text: null,
      choices:[]
    })
   
    giveCard(newCard)
    setCard(newCard)
  }

  const deleteCheckbox=(ContentId)=>{
      let newCard={...card}
      newCard.Context.splice(ContentId,1)
      setCard(newCard)
      giveCard(newCard)
  }

  const  AddTextbox=()=>{
    let newCard={...card}
    newCard.Context.push({
      type:"text",
      text: null,

    })
    setCard(newCard)
    giveCard(newCard)
  }

  
  return (
    <div class="noteModal">
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper} style={{color: bgTheme[selectedTheme].color, backgroundImage: `url(${bgTheme[selectedTheme].bg})`}} >
            <input type="text" className="modalInput" placeholder="Title" name="title" value={card.Title} onChange={handleTitleChange} 
            onBlur={()=>{setActiveElement({
              ContentId:null,
              OptionId:null,
              title:true
            })}}
            />
            <div className="context">
           {
             card.Context.map((content,id)=>{
               if(content.type==="text"){
                 return(
                <TextareaAutosize
           
                className="modalTextarea" 
                style={{fontFamily:font}} 
                placeholder="Make a Note" 
                value={content.text}
                onChange={(e)=>{handleContentTextChange(id,e)}}
                onBlur={()=>{setActiveElement({
                  ContentId:id,
                  OptionId:null,
                  title:false
                })}}
                 />)
               }
               else{
                 return(
                <ContentCheckbox 
                  edit={true} 
                  choices={content.choices}
                   text={content.text}
                   id1={id}
                   handleChange={handleContextCheckboxChange}
                   deleteCheckbox={deleteCheckbox}
                   
                   />)
               }
             })
           }
           </div>
            <ModalCardFooter handleContributeModalOpen={handleContributeModalOpen}
            
            handleChangeTheme={handleChangeTheme}
            handleAddTime={addTime}
            handleAddCheckbox={addCheckbox}
            handleAddTextbox={AddTextbox}
            note={noteId}
            hideContributer={hideContributer}
        notesHidden={notesHidden}
            />

            <Button color="primary" onClick={handleClose} style={{color:"inherit",float:"right"}}>Save & Close</Button>
          </div>
          
      
        </Fade>
    
      </Modal>
    </div>
  );
}
