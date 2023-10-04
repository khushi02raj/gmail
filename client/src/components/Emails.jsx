import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api_url';
import {Box, Checkbox, List} from '@mui/material'
import {DeleteOutline} from '@mui/icons-material';
import Email from './Email';
import NoMail from './NoMail';
import { EMPTY_TABS } from '../constants/constant';
const Emails = () => {
  const [selectedEmails,setSelectedEmails]=useState([])
  const [refreshScreen,setRefreshScreen]=useState(false)
  const {openDrawer}=useOutletContext();
  const {type}=useParams(); //in url

  const getEmailService=useApi(API_URLS.getEmailFromType);
  const moveEmailsToBinService=useApi(API_URLS.moveEmailsToBin)
  const deleteEmailService=useApi(API_URLS.deleteEmail)
  const selectAllEmails=(e)=>{
    if(e.target.checked){
     const emails= getEmailService?.response?.map(email=>email._id)
      setSelectedEmails(emails)
    }
    else{
      setSelectedEmails([])
    }

  }
  const deleteSelectedEmails=(e)=>{
    if(type==='bin')//if inside bin delete permanently
    {
      deleteEmailService.call(selectedEmails)
    }else{
      moveEmailsToBinService.call(selectedEmails)//else move to bin
    }
    setRefreshScreen(prevState=>!prevState)
  }
  useEffect(()=>{
    getEmailService.call({},type);
    },[type,refreshScreen])//when type changes we have to call 
  return (
    <Box
       style={ openDrawer?{marginLeft:250,width:'calc(100%-250px)'}:
                        {width:'100%'}}>
                          <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}  >
                          <Checkbox size='small' onChange={(e)=>selectAllEmails(e)}/>
                          <DeleteOutline onClick={(e)=>deleteSelectedEmails(e)}/>
                          </Box>
                          <List >
                            {
                              //getEmailService!=null && response!=null
                              getEmailService?.response?.map(email=>(
                                <Email key={email._id} email={email} selectedEmails={selectedEmails}
                                setRefreshScreen={setRefreshScreen}
                                setSelectedEmails={setSelectedEmails}
                                />
                                ))
                            }
                          </List>
                          {
                            getEmailService?.response?.length===0 &&
                            <NoMail message={EMPTY_TABS[type]}/>
                          }
   </Box>
  )
}

export default Emails

