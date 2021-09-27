import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import OtpInput from 'react-otp-input';
import 'react-notifications/lib/notifications.css';
import axios from '../../axios';

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

export default function PasswordModal(props) {
  const classes = useStyles();
  const {passwordModalState,handlePasswordModalClose,
    setHiddenPassword,
    hiddenNoteCard,
  noteId}=props
  const [password,setPassword]=useState("")
  const [open, setOpen] = React.useState(false);

  console.log(setHiddenPassword)


  //const theme=props.mainTheme;
 const {form}=props
  useEffect(()=>{
    setOpen(passwordModalState)

},[passwordModalState])
  

  const handleClose = () => {
    handlePasswordModalClose()

  };

  const handleSave=()=>{
    axios.post('/hidden/setHiddenPassword',{
      authToken:localStorage.getItem('auth-token'),
      password:password
    })
    .then(()=>{
      handlePasswordModalClose()
      hiddenNoteCard(noteId)
      setHiddenPassword(true)
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
            Create a New passkey
          <OtpInput
        value={password}
        onChange={(p)=>{setPassword(p)}}
        numInputs={4}
        separator={<span>-</span>}
        isInputNum={true}
        isInputSecure={true}
      />       
          <Button color="primary" 
          onClick={handleSave}
          disabled={!(password.length===4)}
          >Save</Button>
          <Button color="secondary" onClick={handleClose} >Cancel</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
