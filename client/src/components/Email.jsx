import {  Star, StarBorder } from '@mui/icons-material'
import {Checkbox} from '@mui/material'

import { Box, Hidden, Typography, styled } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {route} from '../routes/route';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api_url';

const Wrapper = styled(Box)`
padding: 0 0 0 10px;
background: #f2f6fc;
display: flex;
align-items:center;
cursor: pointer;
& > div {
    display: flex;
    width: 100%
}
& > div > p {
    font-size: 14px;
}
`;
const Indicator = styled(Typography)`
    font-size: 12px !important;
    background: #ddd;
    color: #222;
    border-radius: 4px;
    margin-right: 6px;
    padding: 0 4px;
`;

const Date=styled(Typography)`
margin-left:auto;
margin-right:20px;
font-size:12px;
color:'#5F6368';
`

const Email = ({email,selectedEmails,setRefreshScreen,setSelectedEmails}) => {
  const navigate=useNavigate()

  const toggleStarredService=useApi(API_URLS.toggleStarredEmail)
  const toggleStarredMails=()=>{
    toggleStarredService.call({id:email._id,value:!email.starred})
    setRefreshScreen(prevState=>!prevState)
  }
  const onValueChange=()=>{
    if(selectedEmails.includes(email._id))
    setSelectedEmails(prevState=>prevState.filter(id=>id!=email._id))
    else
    setSelectedEmails(prevState=>[...prevState,email._id])
  }

  return (
    <Wrapper>
     <Checkbox fontSize="small" checked={selectedEmails.includes(email._id)}
     onChange={()=>onValueChange()}/>
     {
      email.starred?
      <Star fontSize='small' style={{marginRight:10, color:'#FFF200'}} 
              onClick={()=>toggleStarredMails()}/>
      :
      <StarBorder fontSize="small" style={{ marginRight: 10 }}
              onClick={()=>{toggleStarredMails()}}/>


     }
     <Box onClick={()=>navigate(route.view.path,{state:{email:email}})}>
    <Typography style={{width:200, overflow:'hidden'}}>{email.name}</Typography>
     <Indicator>Inbox</Indicator>
     <Typography>{email.subject} {email.body && '-' }{email.body}</Typography>
     <Date>
        {(new window.Date(email.date)).getDate()}
        {(new window.Date(email.date)).toLocaleString('default',{month:'long'})}
     </Date>
     </Box>
    </Wrapper>
  )
}

export default Email
