import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import CreateLinkForm from './CreateLinkForm';

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

export default function GenerateLink(props) {
  const classes = useStyles();
  const {modalState,handleModalClose,noteId}=props
  const [open, setOpen] = React.useState(false);
  //const theme=props.mainTheme;
//  const {form}=props
  useEffect(()=>{
    setOpen(modalState)

},[modalState])
  

  const handleClose = () => {
    handleModalClose()

  };

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
          <center>
          <h4 style={{fontFamily:"Franklin Gothic Medium"}}>Creating Link Will be a potential risk for your Notes, Share this on your own risk</h4>
          </center>
              <CreateLinkForm noteId={noteId} handleClose={handleClose}/>
          <Button color="primary" onClick={handleClose} >Close</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
