import React, { Suspense, useState } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Emails from '../components/Emails';
import { Outlet } from 'react-router-dom';
import SuspenseLoader from '../commons/SuspenseLoader';

const Main = () => {
  const [openDrawer,setOpenDrawer]=useState(true);
  const toggleDrawer=()=>{
    setOpenDrawer(prevState=>!prevState)
  }
  return (
    <div>
      <Header toggleDrawer={toggleDrawer} />
      <SideBar openDrawer={openDrawer}/>
      {/* <Emails openDrawer={openDrawer}/> we cannot hardcode this as we don't know which element to show all or single mail  */}
      {/* thus we will use outlet for both route child component */}
      <Suspense fallback={<SuspenseLoader/>}>
        <Outlet context={{openDrawer}}/>
      </Suspense>
    </div>
  )
}

export default Main
