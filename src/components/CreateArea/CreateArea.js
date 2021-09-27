import React, { useEffect, useState } from 'react'
import LockedCard from '../LockedCard/LockedCard'
import NoteCard from '../NoteCard/NoteCard'
import PasswordModal from '../PasswordModal/PasswordModal'
import TitleCard from '../TitleCard/TitleCard'
import './CreateArea.css'
import { useHistory } from "react-router-dom";
import axios from '../../axios'
import Loader from '../Loader/Loader'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
 

function CreateArea() {
    const [modalState,setModalState]=useState(false)
    const [passwordModalState,setPasswordModalState]=useState(false)
    let history=useHistory()
    let authToken=localStorage.getItem('auth-token')
    const [loadingState,setLoadingState]=useState(true)
    const  createNotification = (type) => {
        return NotificationManager.success('Success message', 'Note is moved to Owned Notes');
        };

    const  createNotificationForDelete = (type) => {
            return NotificationManager.success('Success message', 'Note is Deleted Successfully');
            };
        
    const  createNotificationForHidden = (type) => {
                return NotificationManager.success('Success message', 'Note is moved to hidden Notes');
                };
    
    if(!authToken){
        history.push('/login')
    }
    const [hiddenPassword,setHiddenPassword]=useState(false)
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
        axios.post('/notes/allNotes',{
            authToken:authToken
        })
        .then(res=>{
            setCards(res.data)
            axios.post('/hidden/isHiddenPasswordSet',{
                authToken:authToken
            })
            .then(res=>{
                setHiddenPassword(res.data)
                console.log("createArea",hiddenPassword)
                setLoadingState(false)
            
            })
            .catch(err=>{
                console.log(err)
                history.push('/noNetwork')
            })
        })
        .catch(err=>{
            console.log(err)
            history.push('/noNetwork')
        })
    },[])
    const handleModalClose=()=>{
        setModalState(false)
    }
    const handleModalOpen=()=>{
        setModalState(true)
    }
    const handlePasswordModalClose=()=>{
        setPasswordModalState(false)
    }
    const handlePasswordModalOpen=()=>{
        setPasswordModalState(true)
    }

    const creatingNewCard=()=>{
        let newCard={
            Title:"",
            Theme:"normal",
            Context:[
                {
                    type:"text",
                    text:""
                }
            ]
        }
        let newcards=[...cards]
        newcards.push(newCard)
        setCards(newcards)
        axios.post('/notes/createNotes',{
            authToken:authToken,
            Title:"",
            Theme:"normal",
            Context:[
                {
                    type:"text",
                    text:""
                }
            ]
        })
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
            history.push('/noNetwork')
        })
        
    }

    const deleteNoteCard=(deleteId)=>{
        let newCards=[...cards]
        console.log(newCards)
        newCards.splice(deleteId,1)
        console.log(newCards)
        setCards(newCards)
        setLoadingState(true)
        axios.post('/notes/deleteNotes',{
            id:deleteId,
            authToken:authToken
        })
        .then(res=>{
            console.log(res.data)
            createNotificationForDelete('success')
            setLoadingState(false)
        })
        .catch(err=>{
            console.log(err)
            history.push('/noNetwork')
        })
    }

    const hiddenNoteCard=(hideId)=>{
        let newCards=[...cards]
        newCards.splice(hideId,1)
        console.log(hideId)
        createNotificationForHidden('success')
        setCards(newCards)
        setLoadingState(true)
        axios.post('/hidden/hideNotes',{
            id:hideId,
            authToken:authToken
        })
        .then(res=>{
            setLoadingState(false)
        })
    }

    const makeContributionForm=(contId)=>{
        let newCards=[...cards]
        newCards.splice(contId,1)
        console.log(contId)
      
        createNotification('success')
        setCards(newCards)
    }


   if(loadingState){
       return(<Loader />)
   }
   else{
    return (
        <div className="createArea">
              <NotificationContainer/>
            <div onClick={()=>{creatingNewCard()}}>
            <TitleCard   />
            </div>
            {console.log(cards)}
           {cards.map((card,noteId)=>{
               return(
                <NoteCard handleModalOpen={handleModalOpen} card={card} noteId={noteId}  key={noteId}
                deleteNoteCard={deleteNoteCard}
                hiddenNoteCard={hiddenNoteCard}
                makeContributionForm={makeContributionForm}
                hiddenPassword={hiddenPassword}
                setHiddenPassword={setHiddenPassword}
                key={card.Title}
                />
               )
           })}
            <PasswordModal handleModalOpen={handlePasswordModalOpen} passwordModalState={passwordModalState} handlePasswordModalClose={handlePasswordModalClose} />      
        </div>
    )
        }
}

export default CreateArea
