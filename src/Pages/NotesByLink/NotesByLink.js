import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Loader from '../../components/Loader/Loader'
import NotesCard from './NotesCard'

function NotesByLink() {
    let {token}=useParams()
    const [notes,setNotes]=useState()
    const [access,setAccess]=useState()
    const history=useHistory()
    useEffect(()=>{
        axios.post('/contribution/getNotesByLink',{
                token:token
        })
        .then(res=>{
            console.log(res.data)
            setNotes(res.data.note[0])
            setAccess(res.data.access)
        })
        .catch(err=>{
            history.push('/pageNotFound')
        })
    },[])
    console.log(notes,access)
    return(
        <>
            {notes?<NotesCard 
        card={notes}
        noteId={notes._id}
        theme={notes.theme}
        access={access}
        token={token}
        />:<Loader />}
        </>
    )
}

export default NotesByLink
