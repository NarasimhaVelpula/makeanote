import { Button } from '@material-ui/core';
import React, { useState ,useEffect} from 'react';
import './ContentCheckbox.css'

function ContentCheckboxPreview(props) {
    const {id1}=props
    const [text,setText]=useState(props.text)
    const [options,setOptions]=useState(props.choices)
    
    useEffect(() => {
        setOptions(props.choices)
        return () => {
            
        }
    }, [props.choices])
    const handleCheck=(e)=>{
       let id=e.target.value
       
        let opt=[...options]
        opt[id].type=!opt[id].type
        setOptions(opt)
        props.handleChange(id1,text,options)
    }

    const handleTextChange=(e)=>{
        setText(e.target.value)
        props.handleChange(id1,text,options)
    }

    const handleOptionValueChange=(e,id)=>{
        let opt=[...options]
        
        opt[id].value=e.target.value
        setOptions(opt)
        props.handleChange(id1,text,options)
    }

    const addOption=()=>{
        let opt=[...options]
        let newopt={
            value:null,
            type:false
        }
        opt.push(newopt)
        setOptions(opt)
        props.handleChange(id1,text,options)
    }

    const deleteOptions=(id)=>{
        let opt=[...options]
        console.log(id)
        opt.splice(id,1)
        setOptions(opt)
        props.handleChange(id1,text,options)
    }

    return (
        <div class="checkbox">
            <input type="text" 
            className="checkboxInput" 
            placeholder="Completion List Title" 
            name="title" value={text} 
            disabled={!props.edit}
            onChange={handleTextChange}
            />
            {options.map((item,id)=>{
                return(
                    <span class="checkboxDivison" style={{color:"inherit"}}>
                    <input type="checkbox" checked={item.type} onChange={handleCheck} value={id} disabled={!props.edit}/>
                     <input type="text" style={item.type?{textDecorationLine:"line-through"}:{}} className="checkboxInput" 
                     placeholder="Title" 
                     name="title"
                      value={item.value} 
                      onChange={(e)=>{handleOptionValueChange(e,id)}}/>
                      {props.edit?<Button onClick={(e)=>{deleteOptions(id)}}>X</Button>:<></>}
                    </span>
                )
            })}
            {
                props.edit?<Button onClick={addOption}>add option</Button>:<></>
            }
            
        </div>
    )
}

export default ContentCheckboxPreview
