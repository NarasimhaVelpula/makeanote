import React from 'react'
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from '../../axios';

function AccessGroup(props) {
    const {noteId,user,type}=props
    
    const [value,setValue]=React.useState(props.value)

    const handleChange=(e)=>{
        setValue(e.target.value)
        if(type==="user")
        {
        axios.post('/contribution/modifyContributerAccess',{
                id:noteId,
                access:e.target.value,
                user:user,
                authToken:localStorage.getItem('auth-token')

        })
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    else{
        axios.post('/contribution/modifyLinkAccess',{
            id:noteId,
            access:e.target.value,
            name:user,
            authToken:localStorage.getItem('auth-token')

    })
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
    }
    }
    return (
        <RadioGroup aria-label="gender" name="gender1" style={{flexDirection:"row"}}
         value={value}
         onChange={handleChange}>
  <FormControlLabel value="read" control={<Radio />} label="Read" />
  <FormControlLabel value="readnwrite" control={<Radio />} label="Read & Write" />
</RadioGroup>
    )
}

export default AccessGroup
