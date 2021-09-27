import { Button, Tooltip } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import './ContentCheckbox.css'

function ContentCheckbox(props) {
    const {id1,deleteCheckbox}=props
    const [text,setText]=useState(props.text)
    const [options,setOptions]=useState(props.choices)
    
    useEffect(() => {
        setOptions(props.choices)
        setText(props.text)
        return () => {
            
        }
    }, [props.choices,props.text])
    const handleCheck=(e)=>{
       let id=e.target.value
       
        let opt=[...options]
        opt[id].type=!opt[id].type
        setOptions(opt)
        props.handleChange(id1,text,options)
    }

    const handleTextChange=(e)=>{
        props.handleChange(id1,e.target.value,options)
        setText(e.target.value)
        
    }

    const handleOptionValueChange=(e,id)=>{
        let opt=[...options]
        
        opt[id].value=e.target.value
        props.handleChange(id1,text,opt)
        setOptions(opt)
        
       
    }

    const addOption=()=>{
        let opt=[...options]
        let newopt={
            value:null,
            type:false
        }
        opt.push(newopt)
        props.handleChange(id1,text,opt)
        setOptions(opt)
      
    }

    const deleteOptions=(id)=>{
        let opt=[...options]
        console.log(id)
        
        opt.splice(id,1)
        props.handleChange(id1,text,opt)
        setOptions(opt)
        
    }

    return (
        <div class="checkbox">
             <span class="checkboxDivison" style={{color:"inherit"}}>
            <input type="text" 
            className="checkboxInput" 
            placeholder="Completion List Title" 
            name="title" value={text} 
            disabled={!props.edit}
            
            onChange={handleTextChange}
            
            />
            {props.edit?<Tooltip title="Delete Checkbox"><Button  style={{color:"inherit"}}
            onClick={()=>{deleteCheckbox(id1)}}
            >X</Button></Tooltip>:<></>}
            </span>
          
            {options.map((item,id)=>{
                return(
                    <span class="checkboxDivison" style={{color:"inherit"}}>
                    <input type="checkbox" checked={item.type} onChange={handleCheck} value={id} disabled={!props.edit} />
                     <input type="text" style={item.type?{textDecorationLine:"line-through"}:{}} className="checkboxInput" 
                     placeholder="Title" 
                     name="option"
                      value={item.value} 
                      onChange={(e)=>{handleOptionValueChange(e,id)}}
                       />
                      {props.edit?<Button onClick={(e)=>{deleteOptions(id)}} style={{color:"inherit"}}>X</Button>:<></>}
                    </span>
                )
            })}
            {
                props.edit?<Button onClick={addOption} style={{color:"inherit"}}>add option</Button>:<></>
            }
            
        </div>
    )
}

export default ContentCheckbox
