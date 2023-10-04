import { Suspense, lazy } from 'react';
import './App.css';
import {Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import {route} from './routes/route';
const ErrorComponent=lazy(()=>import ('./commons/ErrorComponent'));
const SuspenseLoader=lazy(()=>import ('./commons/SuspenseLoader'));
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route>
       <Route path={route.main.path} element={<Navigate to={`${route.emails.path}/inbox}`}/>}/> {/* default path */}
       {/* full screen */}
      <Route path={route.main.path} element={<route.main.element/>}> 
      {/* rendering child of main */} 
              <Route path={`${route.emails.path}/:type`} element={<route.emails.element/>} errorElement={<ErrorComponent/>}/>       {/* // all emails */}
              <Route path={route.view.path} element={<route.view.element/>} errorElement={<ErrorComponent/>}/> {/* individual mail */}

      </Route>
      <Route path={route.invalid.path} element={<Navigate to={`${route.emails.path}/inbox}`}/>} /> {/* invalid path */}
      </Route>

  )
)
function App() {
  return (
    //used for lazy loading
    <Suspense fallback={<SuspenseLoader/>}> 
      <RouterProvider router={router}/>
    </Suspense>
  );
}

export default App;
