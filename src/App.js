
import './App.css';
import { YMaps } from '@pbe/react-yandex-maps';
import { Outlet, Route, Routes } from 'react-router-dom';
import {AuthLayout} from "./componets/authComponents/AuthLayout"
import {ProtectedLayout} from "./componets/authComponents/ProtectedLayout"
import NavMain from './componets/profile/NavMain';
import ScrollLayout from './componets/ScrollLayout';
import { Orders } from './componets/profile/Orders';
import LogIn from './componets/authComponents/LogIn';
import {DataClient} from './componets/profile/DataClient'
import "./style/mainStyle.css"
import "./style/auth.css";
import {CtxClient} from './Contexts/Contexts'
import { useState } from 'react';
import { OrdersFree } from './componets/profile/OrdersFree';
import { MapLayout } from './componets/profile/MapLayout';
import { OrderShow } from './componets/profile/OrderShow';
import { OrderShowFree } from './componets/profile/OrderShowFree';
import { OrdersFreeNearst } from './componets/profile/OrdersFreeNeaRest';
require('dotenv').config()
function App() {
  const [client,setClient]=useState({});
  return (
    <CtxClient.Provider value={{client,setClient}}>
      <YMaps query={{ 
        apikey: process.env.API_KEY,
        load: "package.full" 
        }} >
        <Routes>
          <Route element={<AuthLayout/>}>
            <Route element={<ProtectedLayout/>}>
              <Route path='courier' element={<Outlet/>}>
                <Route path='profile' element={<><NavMain/><Outlet/></>}>
                  <Route element={<ScrollLayout/>}>
                    <Route path='data' element={<DataClient/>}/>                   
                    <Route path='orders' element={<Orders/>}/>
                    <Route path='orders/:id' element={<Orders/>}/>
                    <Route path='new_orders' element={<OrdersFree/>}/>
                    <Route index path='new_orders/nearest' element={<OrdersFreeNearst/>}/>
                    <Route path='orders/:id/courier/:idC' element={<OrderShow/>}/>
                    <Route path='new_orders/free/:id' element={<OrderShowFree/>}/>                    
                  </Route>
                </Route>
              </Route>              
            </Route>
            <Route path='/auth/login' element={<LogIn/>}/>
          </Route> 
        </Routes>
      </YMaps>     
    </CtxClient.Provider>
  );
}

export default App;
