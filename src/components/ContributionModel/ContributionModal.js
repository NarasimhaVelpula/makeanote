import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, IconButton } from '@material-ui/core';
import COntributersTable from '../ContributersTable/ContributersTable'
import './ContributionModal.css'
import GenerateLink from './GenerateLink';
import AddUser from './AddUser';
import axios from '../../axios';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ContributionModal(props) {
  const classes = useStyles();
  const [generateLinkModal,setGenerateLinkModal]=useState(false)
  const [addUserModal,setAddUserModal]=useState(false)
  const {modalState,handleModalClose,giveCard,noteId,noUsers,editModalCard}=props
  const [open, setOpen] = React.useState(false);
  const [card,setCard]=useState(props.card)
  let history=useHistory()
  const [contributionData,setContributionData]=useState([])
  const [linkData,setLinkData]=useState([])
  //const theme=props.mainTheme;
 
  useEffect(()=>{
    setOpen(modalState)
    axios.post('/contribution/getContributers',{
      id:noteId,
       authToken:localStorage.getItem('auth-token')
      
    })
    .then(res=>{
      setContributionData(res.data.contributers)
      setLinkData(res.data.links)
    })
    .catch(err=>{
      console.log(err.data)
    })
},[modalState,addUserModal,generateLinkModal])
  

  const handleClose = () => {
    handleModalClose()

  };

  const handleGenerateLinkModalOpen=()=>{
      setGenerateLinkModal(true)
  }

  const handleGenerateLinkModalClose=()=>{
      setGenerateLinkModal(false)
  }

  const handleAddUserModalOpen=()=>{
    setAddUserModal(true)
}

const handleAddUserModalClose=()=>{
    setAddUserModal(false)
}

const makeContributionForm=()=>{
  axios.post('/contribution/createContributionNotes',{
    id:noteId,
    authToken:localStorage.getItem('auth-token')

  })
  .then((res)=>{
    handleModalClose()
    props.makeContributionForm(noteId)
   
   
})
.catch(err=>{
    console.log(err)
    history.push('/noNetwork')

  })
}

  return (
    <div>
      
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
          <div className={classes.paper}>
            {editModalCard?<>
              <center>
          <h4 style={{fontFamily:"Franklin Gothic Medium"}}>Alone We can do so little; Together we can do much.</h4>
          </center>

              <div className="mainButtons">
                  <IconButton>
          <Button color="primary" variant="contained" onClick={handleAddUserModalOpen}>Add User</Button>
        
        </IconButton>
        <IconButton>
          <Button color="secondary" variant="contained" onClick={handleGenerateLinkModalOpen}>Generate Link</Button>
          </IconButton>
          </div>
          {noUsers && <COntributersTable noteId={noteId} contributionData={contributionData} linkData={linkData}/>}
          <Button color="primary" onClick={handleClose} >Close</Button>
          <GenerateLink modalState={generateLinkModal} handleModalClose={handleGenerateLinkModalClose} noteId={noteId}/>
          <AddUser modalState={addUserModal} handleModalClose={handleAddUserModalClose} noteId={noteId}/>
          </>:<>Do you want to make to it Contribution Form?
          <br />
          <Button color="primary" onClick={makeContributionForm} >Yes</Button>
          <Button color="primary" onClick={handleClose} >Cancel</Button>
          </>}
          </div>
         
        </Fade>
      </Modal>
    </div>
  );
}
