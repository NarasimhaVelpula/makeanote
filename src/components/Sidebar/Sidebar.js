import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
   
   const pathname=window.location.pathname
   const pathArray=pathname.split("/")
   let path=pathArray[pathArray.length-1]
   path=path==="dashboard"?"mynotes":path
   const [activeElement,setActiveElement]=useState(path)
   
    return (
        <div className="sidebar">
              <Link class={activeElement==="mynotes"  &&"active"} to="/dashboard/mynotes" onClick={()=>{setActiveElement("mynotes")}}>All Notes</Link>
  <Link to="/dashboard/ownedNotes" class={activeElement==="ownedNotes"&&"active"} onClick={()=>{setActiveElement("ownedNotes")}} >Owned Notes</Link>
  <Link to="/dashboard/OtherNotes" class={activeElement==="OtherNotes"&&"active"} onClick={()=>{setActiveElement("OtherNotes")}}>Other's Notes</Link>
  <Link to="/dashboard/hiddenNotes" class={activeElement==="hiddenNotes"&&"active"} onClick={()=>{setActiveElement("hiddenNotes")}}>Hidden Notes</Link>
        </div>  
    )
}

export default Sidebar
