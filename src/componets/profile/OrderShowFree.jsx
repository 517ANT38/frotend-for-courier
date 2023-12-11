import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../security/auth";
import { error_handler, getMapTrans, newId, parseJwt } from "../../util/util";
import Prealoder from "../map/Prealoder";
import React from "react";
import { CtxMapOpen } from "../../Contexts/Contexts";
export function OrderShowFree(){
     
    const [data,setData]=useState({});
    const {id,idC}=useParams();
    const [nId,setNId]=useState('');
    const {user,logout}=useAuth();
    const [state,setState]=useState();    
    const [open,setOpen]=useState();
    const [select,setS]=useState(false);    
    const [coords,setCoords]=useState({});
    const json=parseJwt(user["jwtToken"])
    useEffect(()=>{
        fetch(`http://localhost:8080/api/orders/free/${id}`,{
            method:"GET",
            headers:{
                'Authorization':"Bearer "+user["jwtToken"]
            }
        })
        .then(x=>{error_handler(x,logout);return x.json()})
        .then(x=>{setData(x);setNId(newId(x))})
        .catch(x=>alert('У нас не поладки'))
    },[])
    const setCourier=()=>fetch(`http://localhost:8080/api/orders/${data.id}/courier?setId=${json.id}`,{
        method:"PATCH",
        headers:{
            'Authorization':"Bearer "+user["jwtToken"]
        }
    })
    .then(x=>{error_handler(x,logout);return x})
    .catch(x=>alert('У нас не поладки'))
  
    return (<>
        <p><Link className="changeBut" style={{textDecoration:"none",width:"max-content"}} to='/courier/profile/new_orders' >
            К заказам</Link>
        </p>
        <div style={{background:"#FFF",padding:"20px",margin:"200px",fontSize:"25px",marginLeft:"500px",height:"350px",justifyContent:"space-around",width:"300px",display:"flex",flexDirection:"column"}} >
            <p className="prop" style={{fontSize:"25px"}}>
                <span>Код заказа: </span>
                <span>{nId}</span>
            </p>
            <p className="prop" style={{fontSize:"25px"}}>
                <span>Статус заказа: </span>
                <span>
                    
                    {getMapTrans(data.status)}
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
            <p className="prop" style={{fontSize:"25px"}}>
                <span>
                    Время доставки:
                </span>
                <span> {data.maxTimeArrival}</span>
                <span> мин</span>
            </p>
            <button className="changeBut" disabled={select} style={(select)?{opacity:"0.5"}:{}} onClick={()=>{setCourier();setS(true)}}>
                Выбрать
            </button>
        
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