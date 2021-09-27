import React, { useEffect, useState } from 'react'
import NoteCard from '../OwnerNotesCard/OwnerNotesCard'
import './OwnedNotes.css'
import { useHistory } from "react-router-dom";
import axios from '../../axios'
import Loader from '../Loader/Loader'

function OwnedNotes() {
    
    let history=useHistory()
    let authToken=localStorage.getItem('auth-token')
    const [loadingState,setLoadingState]=useState(true)
    console.log("iam here")
    if(!authToken){
        history.push('/login')
    }
    
    const [cards,setCards]=useState([
        {
            Title: "Credit Note23",
            Context:[
                {
                    type:"text",
                    text:"This is the firstline of text but here Iam putting my effort"
                },
                {
                    type:"checkbox",
                    text:"What tasks done?",
                    choices:[
                        {
                            value:"do task1",
                            type:true
                        },
                        {
                            value:"do task2",
                            type: false
                        }
                    ]
                },
                {
                    type:"text",
                    text:"This is the firstline of text but here Iam putting my effort"
                }
            ],
            Theme:"city",
           Font:"PlayFair",
           visibility: true
        }, {
            Title: "Credit Note23",
            Context:[
                {
                    type:"text",
                    text:"This is the firstline of text but here Iam putting my effort"
                },
                {
                    type:"checkbox",
                    text:"What tasks done?",
                    choices:[
                        {
                            value:"done task1",
                            type:true
                        },
                        {
                            value:"done task2",
                            type: false
                        }
                    ]
                },
                {
                    type:"text",
                    text:"This is the firstline of text but here Iam putting my effort"
                }
            ],
            Theme:"night",
           Font:"PlayFair",
           visibility: true
        }
    ])

    useEffect(()=>{
        axios.post('/contribution/getOwnedNotes',{
            authToken:authToken
        })
        .then(res=>{
            console.log(res.data)
            setCards(res.data)
            setLoadingState(false)
        })
        .catch(err=>{
            console.log(err)
            history.push('/noNetwork')
        })
    },[])

   
    const deleteNoteCard=(deleteId)=>{
        let newCards=[...cards]
        newCards.splice(deleteId,1)
        console.log(deleteId)
        setCards(newCards)
        axios.post('/contribution/deleteNotes',{
            id:deleteId,
            authToken:authToken
        })
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
            history.push('/noNetwork')
        })
    }


   if(loadingState){
       return(<Loader />)
   }
   else{
    return (
        <div className="createArea">
            
           {cards.length && cards.map((card,noteId)=>{
              
               return(
                <NoteCard card={card.notes[0]} noteId={card._id}  
                deleteNoteCard={deleteNoteCard}
                />
               )
           })}
            </div>
    )
        }
}

export default OwnedNotes
