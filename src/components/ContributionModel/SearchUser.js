/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import { Button, IconButton } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from '../../axios';

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')`
  width: 300px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

export default function Searchuser(props) {

  const {noteId,handleModalClose}=props
  const [butval,setButval]=useState(true)
  console.log(noteId)
  const [users,setUsers]=useState([])
  useEffect(()=>{
    axios.post('/contribution/getUsers',{
      id:noteId,
       authToken:localStorage.getItem('auth-token')
    })
    .then(res=>{
      setUsers(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])

  const addUsers=()=>{
    console.log("adding values")
    console.log(value)
    console.log(rwValue)
    setButval(false)
    axios.post('/contribution/addContributers',{
      list:value,
      id:noteId,
      access:rwValue,
       authToken:localStorage.getItem('auth-token')
    })
    .then(res=>{
      console.log(res.data)
      handleModalClose()
    })
    .catch(err=>{
      console.log(err)
      setButval(true)
    })
  }

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [],
    multiple: true,
    options: users,
    getOptionLabel: (option) => option.email,
  });

  const [rwValue,setRwValue]=useState("read")
  
  

  const handleChange=(e)=>{
      setRwValue(e.target.value)
  }
  console.log(groupedOptions)
  return (
    <NoSsr>
      <div>
        <div {...getRootProps()}>
          <Label {...getInputLabelProps()}>Search for User Email</Label>
          <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
            {value.map((option, index) => (
              <Tag label={option.email} {...getTagProps({ index })} />
            ))}

            <input {...getInputProps()} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.email}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox>
        ) : null}

<RadioGroup aria-label="gender" name="gender1" style={{flexDirection:"row"}} value={rwValue} onChange={handleChange}>
  <FormControlLabel value="read" control={<Radio />} label="Read" />
  <FormControlLabel value="readnwrite" control={<Radio />} label="Read & Write" />
</RadioGroup>
        <IconButton>

        <Button variant="contained" color="primary" onClick={addUsers} disabled= { butval && value.length!=0?false:true}>{butval?"Save":"Saving"}</Button>
        </IconButton>
      </div>
    </NoSsr>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
