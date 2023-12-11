import { faCutlery, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { OrderShow } from "./OrderShow";
import { useContext, useEffect, useState } from "react";
import { DishList } from "./DishList";
import { CtxMapIds } from "./../../Contexts/Contexts";

import { error_handler, getMapTrans, parseJwt } from "../../util/util";
import { useAuth } from "../../security/auth";
import { useNavigate } from "react-router-dom";
export function Order({data,fl=false,className='',call=()=>{}}){
    const {user}=useAuth();
    const json=parseJwt(user["jwtToken"]);
   
    const nav=useNavigate();
   
    
    return(
        <div className={`stripOrder ${className}`} style={{
            display:"flex",
            flexDirection:'column',
            alignItems:"center",
            position:"relative"
        }}>
            <p className="prop">
              <span className="clOr weigthVal">Код заказа: </span><span>{data.normId}</span>
            </p>
            <p className="prop">
                <span className="clOr weigthVal">Статус: </span>
                <span>{getMapTrans(data.status)}</span>
            </p>            
            <p className="prop">
                <span className="clOr weigthVal">Стоимость: </span>
                <span>{data.cost}</span>
                <span> ₽</span>
            </p>
            {/*  */}
           <button className="changeBut" onClick={()=>{
                call()
                nav(fl?`/courier/profile/orders/${data.id}/courier/${json.id}`:`/courier/profile/new_orders/free/${data.id}`)
               
            }
            }>
                Подробнее
           </button>
        </div>
    )
}