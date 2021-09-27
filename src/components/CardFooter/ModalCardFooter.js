import React from 'react'
import './CardFooter.css'
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import VisibilitySelector from '../VisibilitySelector/VisibilitySelector';
import AddContributer from '../AddContributer/AddContributer'
import AddTime from '../AddTime/AddTime';
import AddCheckbox from '../AddCheckbox/AddCheckbox';
import AddTextbox from '../AddTextbox/AddTextbox';
function ModalCardFooter(props) {
    const {handleContributeModalOpen,handleChangeTheme,
        handleAddTime,
        handleAddTextbox,
        handleAddCheckbox,noteId,owned,hideContributer,notesHidden}=props
    return (
        <div class="footer">
             <ThemeSelector handleChangeTheme={handleChangeTheme} />
            
            {!hideContributer && <AddContributer handleContributeModalOpen={handleContributeModalOpen} noteId={noteId}/>}
             <AddTime  handleAddTime={handleAddTime}/>
             <AddCheckbox handleAddCheckbox={handleAddCheckbox} />
             <AddTextbox handleAddTextbox={handleAddTextbox} />
        </div>
    )
}

export default ModalCardFooter
