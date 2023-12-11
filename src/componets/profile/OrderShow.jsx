import { useContext, useEffect, useState } from "react";
import { CtxMapIds, CtxMapOpen } from "./../../Contexts/Contexts";
import React from "react";
import { error_handler, getMapTrans, newId } from "../../util/util";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../security/auth";
import Prealoder from "../map/Prealoder";

export function OrderShow(){
    
    const [data,setData]=useState({});
    const {id,idC}=useParams();
    const [nId,setNId]=useState('');
    const {user,logout}=useAuth();
    const [state,setState]=useState();
    const [coords,setCoords]=useState({});
    const [open,setOpen]=useState();
    useEffect(()=>{
        fetch(`http://localhost:8080/api/orders/${id}/courier/${idC}`,{
            method:"GET",
            headers:{
                'Authorization':"Bearer "+user["jwtToken"]
            }
        })
        .then(x=>{error_handler(x,logout);return x.json()})
        .then(x=>{setData(x);setState(x.status);setNId(newId(x))})
        .catch(x=>alert('У нас не поладки'))
    },[])
    const updateState=(state)=>fetch(`http://localhost:8080/api/orders/${data.id}?status=${state}`,{
        method:"PATCH",
        headers:{
            'Authorization':"Bearer "+user["jwtToken"]
        }
    })
    .then(x=>{error_handler(x,logout);return x})
    .catch(x=>alert('У нас не поладки'));
    return (<>
            <p><Link className="changeBut" style={{textDecoration:"none",width:"max-content"}} to='/courier/profile/orders' >
                К заказам</Link>
            </p>
            <div style={{background:"#FFF",padding:"20px",margin:"200px",marginTop:"100px",fontSize:"25px",marginLeft:"500px",height:"370px",justifyContent:"space-around",width:"350px",display:"flex",flexDirection:"column"}} >
                <p className="prop" style={{fontSize:"25px"}}>
                    <span>Код заказа: </span>
                    <span>{nId}</span>
                </p>
                <p className="prop" style={{fontSize:"25px"}}>
                    <span>Статус заказа: </span>
                    <span>
                    
                        {getMapTrans(state)}
                    </span>
                </p>
                <p className="prop" style={{fontSize:"25px"}}>
                    <span>
                        Стоимость : </span>
                    <span>
                        {data?.cost}
                    </span>
                    <span> ₽</span>
                </p>
                <p className="prop" style={{fontSize:"25px"}} >
                    <span>
                        Тип доставки: 
                    </span>
                    <span> {getMapTrans(data.typeDelivery)}</span>
                </p>
                {data.textOrder&&<p className="prop" style={{fontSize:"25px"}}>
                    <span>Сообщение клиента: </span>
                    <span>
                        {data.textOrder}
                    </span>
                </p>}
                <div style={{
                    display:"flex",
                    width:"300px",
                    justifyContent:"space-around"
                }}>
                    <button 
                    className="changeBut" 
                    disabled={state!='READY'}
                    style={(state!='READY')?{opacity:"0.5"}:{}}
                    onClick={()=>{updateState('DELIVERY');setState('DELIVERY')}}
                    >
                        В доставке
                    </button>
                    <button 
                    className="changeBut" 
                    disabled={state!='DELIVERY'}
                    style={(state!='DELIVERY')?{opacity:"0.5"}:{}}
                    onClick={()=>{updateState('DELIVERED');setState('DELIVERED')}}
                    >
                        Доставлен
                    </button>
                </div>
            
                <button className="changeBut" onClick={()=>{setCoords(data.routeDto.from);setOpen(true)}} style={{width:"max-content"}}>
                    Маршрут до ресторана
                </button>
                <button className="changeBut" onClick={()=>{setCoords(data.routeDto.to);setOpen(true)}} style={{width:"max-content"}}>
                    Маршрут до клиента
                </button>
                <CtxMapOpen.Provider value={setOpen}>
                    {open&&<Prealoder coords={coords}/>}
                </CtxMapOpen.Provider>
            </div>
        </>
    )
}