import { lazy } from "react";

const Emails = lazy (()=>import ("../components/Emails"));
const Main =lazy (()=> import ("../pages/Main"));
const ViewEmail=lazy (()=> import ("../components/ViewEmail"));

const route = {
  main:{
    path:'/',
    element:Main
  },
  emails:{
    path:'/emails',
    element:Emails
  },
  view:{
    path:'/view',
    element:ViewEmail
  },
  invalid:{
    path:'/*',
    element:Emails
  }
}

export  {route};
