import React from 'react'
import './CardFooter.css'
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import AddTime from '../AddTime/AddTime';
import AddCheckbox from '../AddCheckbox/AddCheckbox';
import AddTextbox from '../AddTextbox/AddTextbox';
function OtherCardFooter(props) {
    const {handleChangeTheme,
        handleAddTime,
        handleAddTextbox,
        handleAddCheckbox}=props
    return (
        <div class="footer">
             <ThemeSelector handleChangeTheme={handleChangeTheme} />
             <AddTime  handleAddTime={handleAddTime}/>
             <AddCheckbox handleAddCheckbox={handleAddCheckbox} />
             <AddTextbox handleAddTextbox={handleAddTextbox} />
        </div>
    )
}

export default OtherCardFooter
