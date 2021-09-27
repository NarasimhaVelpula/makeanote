import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, CardActions } from '@material-ui/core';
import OtpInput from 'react-otp-input';
import { useHistory } from "react-router-dom";
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

export default function CheckingPasswordModal(props) {
  const classes = useStyles();
  const {passwordModalState,handlePasswordModalClose,
  }=props
  const [password,setPassword]=useState("")
  const [open, setOpen] = React.useState(false);
  const [wrong,setWrong]=useState(false)
  let history=useHistory()
  //const theme=props.mainTheme;
 const {form}=props
  useEffect(()=>{
    setOpen(passwordModalState)

},[passwordModalState])
  

  const handleClose = () => {
    history.push('/dashboard/mynotes')
    
    history.push('/dashboard/mynotes')
    handlePasswordModalClose()
  };

  const handleSave=()=>{
        axios.post('/hidden/checkPassword',{
            password:password,
            authToken:localStorage.getItem('auth-token')
        })
        .then(res=>{
            handlePasswordModalClose()
        })
        .catch(err=>{
            setWrong(true)
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
         {props.length!==0? <div className={classes.paper}>
            Enter a Passkey
          <OtpInput
        value={password}
        onChange={(p)=>{setPassword(p)}}
        numInputs={4}
        separator={<span>-</span>}
        isInputNum={true}
        isInputSecure={true}
      />   
     { wrong && <span style={{color:"red"}}>Wrong Passkey</span>    }
     <br />
          <Button color="primary" 
          onClick={handleSave}
          disabled={!(password.length===4)}
          >Submit</Button>
          <Button color="secondary" onClick={handleClose} >Back</Button>
          </div>:
          <div className={classes.paper}>
              No hidden notes
              <Button color="secondary" onClick={handleClose} >Back</Button>
          </div>}
        </Fade>
      </Modal>
    </div>
  );
}
