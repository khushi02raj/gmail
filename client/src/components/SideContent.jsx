import { Box, Button,List,ListItem,styled} from '@mui/material'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { SIDEBAR_DATA } from '../config/sidebar.config';
import ComposeMail from './ComposeMail';
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { route } from '../routes/route';
const ComposeButton = styled(Button)`
    background: #c2e7ff;
    color: #001d35;
    border-radius: 16px;
    padding: 15px;
    min-width: 140px;
    font-weight:bold;
    text-transform: none;
`
const Container = styled(Box)`
    padding: 8px;
    & > ul {
        padding: 10px 0 0 5px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        &>a{
          text-decoration: none;
          color: inherit;
        }
    }
        & > ul {
            text-decoration: none;
            color: inherit;
        }
        & > ul> a > li > svg {
            margin-right: 20px;
        }
      
        `
const SideContent = () => {
  const [openDialog,setOpenDialog]=useState(false);
  const {type}=useParams();
  const handleClick=()=>{
    setOpenDialog(true);
  }
  return (
    <Container>
      <Box>
        <ComposeButton onClick={handleClick}><CreateOutlinedIcon style={{'marginRight':'15px'}}/>Compose</ComposeButton>
      </Box>
      <List>
        {
            SIDEBAR_DATA.map((item)=>(
                <NavLink key={item.name} to={`${route.emails.path}/${item.name}`}>
                <ListItem style={type===item.name.toLowerCase()?
                  {backgroundColor:'#d3e3fd', borderRadius:'0 16px 16px 0'}:{}}>
                  <item.icon fontSize='small'/>{item.title}
                </ListItem>
                </NavLink>
            ))
        }
      </List>
      <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog}/>
    </Container>
  )
}

export default SideContent
