import { Close, DeleteOutline } from '@mui/icons-material'
import { Box, Button, Dialog, InputBase, TextField, Typography ,styled} from '@mui/material'
import React, { useState } from 'react'
import useApi from '../hooks/useApi'
import { API_URLS } from '../services/api_url'
const dialogStyle={
  height: '90%',
  width: '80%',
  maxWidth: '100%',
  maxHeight: '100%',
  boxShadow: 'none',
  borderRadius: '10px 10px 0 0',
}
const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;
const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;
const Footer=styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 2px 15px;
  align-items:center;
`
const SendButton=styled(Button)`
  background-color: #0b57d0;
  color:white;
  text-transform:none;
  border-radius: 18px;
`
const ComposeMail = ({openDialog, setOpenDialog}) => {

  const [data,setData]=useState({});
  const sentEmailService=useApi(API_URLS.saveSentEmails);//initialising custom hook
  const saveDraftService=useApi(API_URLS.saveDraftEmails);
  
  const config={
    Username :" gmaildemo@yopmail.com",
    Password : "95DB193256E77E1364D7D69EE346189B7474",
    Host : "smtp.elasticemail.com",
    Port:2525,
  }
  
  const sendMail=async(e)=>{
    e.preventDefault();
    if(window.Email){
        window.Email.send({
          ...config,
          To : data.to,
          From : "khushi097raj@gmail.com",
          Subject : data.subject,
          Body : data.body
      }).then(
        message => alert(message)
      );
    }
    const payload={
      to:data.to,
      from : "khushi097raj@gmail.com",
      subject : data.subject,
      body : data.body,
      date:new Date(),
      image:'',
      name:'Khushi',
      starred:false,
      type:'sent'
    }
    sentEmailService.call(payload);
    setOpenDialog(false);
    if (!sentEmailService.error) {
      setOpenDialog(false);
      setData({});
  } else {

  }
  }
 
  const closeComposeMail=(e)=>{ //save draft on closing compose mail 
    const payload={
      to:data.to,
      from : "khushi097raj@gmail.com",
      subject : data.subject,
      body : data.body,
      date:new Date(),
      image:'',
      name:'Khushi',
      starred:false,
      type:'drafts'
    }
    saveDraftService.call(payload);
    setOpenDialog(false);
    if (!saveDraftService.error) {
      setOpenDialog(false);
      setData({});
  } else {

  }
  }

  const onValueChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
     console.log(data);
  }

  const handleClick=()=>{
    setOpenDialog(false);
  }

  return (
    <Dialog  open={openDialog}
    PaperProps={{sx:dialogStyle}}>
        <Header>
            <Typography>New Message</Typography>
            <Close fontSize='small' onClick={(e)=>{closeComposeMail(e)}}/>
        </Header>
        <RecipientWrapper>
          <InputBase placeholder='Recipients' onChange={(e)=>onValueChange(e)} name='to'/>
          <InputBase placeholder='Subject' onChange={(e)=>onValueChange(e)} name='subject'/>
        </RecipientWrapper>
        {/* sx is used to handle internal props */}
        <TextField multiline rows={15} onChange={(e)=>onValueChange(e)} name='body'
        sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'}}}/>
        <Footer>
          <SendButton onClick={(e)=>sendMail(e)}>Send</SendButton>
          <DeleteOutline onClick={handleClick}/>
        </Footer>
     </Dialog>
  )
}

export default ComposeMail
