import React, { useState } from 'react';

 import { useFormik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from '../../axios';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

 const validate = values => {

   const errors = {};

 

   if (!values.linkName) {

     errors.linkName = 'Required';

   } else if (values.linkName.length > 15) {

     errors.linkName = 'Must be 15 characters or less';

   }
   return errors;

 };


 const CreateLinkForm = (props) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateError,setDateError]=useState(true)

    const {handleClose,noteId}=props
   
    const handleDateChange = (date) => {
      
      setSelectedDate(date);
      console.log(date)
      if(date<new Date()){
          setDateError("Date Cannot be previous value")
      }
      else{
      if(date==null){
          setDateError("Date Cannot be null")
      }
      else{
          setDateError(false)
          
      }
    }
    };
   
   const formik = useFormik({

     initialValues: {

       linkName: '',

       selected: '',

       access: 'read',

     },

     validate,

     onSubmit: values => {
      console.log(values)
       alert(JSON.stringify(values, null, 2));
       axios.post('/contribution/addContributionLink',{
         authToken:localStorage.getItem('auth-token'),
         name:values.linkName,
         expiryTime:selectedDate,
         access:values.access,
         id:noteId

       })
       .then(res=>{
         console.log(res.data)
         handleClose()
       })
       .catch(err=>{
         console.log(err.data)
       })

     },

   });


   return (

     <form onSubmit={formik.handleSubmit}>

        
            <TextField
             id="linkName"

             name="linkName"
    
             type="text"

             label="Link Name"
    
             onChange={formik.handleChange}

             error={formik.errors.linkName ? true : false}
             helperText={formik.errors.linkName}
             onBlur={formik.handleBlur}
    
             value={formik.values.firstName}
            />
            <br />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
   
        <KeyboardDatePicker
          margin="normal"
          id="date"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          onChange={handleDateChange}
          value={selectedDate}
          error={dateError}
          helperText={dateError}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          color="primary"
          
        />
        <br />
         <KeyboardTimePicker
          margin="normal"
          id="time"
          label="Time picker"
          value={selectedDate}
          error={dateError}
          onChange={handleDateChange}
          helperText={dateError}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />

        </MuiPickersUtilsProvider>

        <RadioGroup aria-label="access" name="access" id="access" style={{flexDirection:"row"}} value={formik.values.access} onChange={formik.handleChange}>
  <FormControlLabel value="read" control={<Radio />} label="Read" />
  <FormControlLabel value="readnwrite" control={<Radio />} label="Read & Write" />
</RadioGroup>
       
    


       <Button type="submit"  variant="contained" color="primary" disabled={dateError}>Generate Link</Button>

     </form>

   );

 };
 export default CreateLinkForm