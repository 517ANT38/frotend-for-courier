import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LoginUser from "./LoginUser";
import { useAuth } from "../../security/auth";
import { error_handler, newId, parseJwt,useInterval } from "../../util/util";
import {CtxClient } from "./../../Contexts/Contexts";
import { useYMaps } from "@pbe/react-yandex-maps";

import React from "react";
import { Order } from "./Order";

function NavMain(){
    
    
    const [dataOrd,setDO]=useState(null);
    let s="widthSize link";
    let {logout,user}=useAuth();
    let json={};
    const cli=useContext(CtxClient);
    const [name,setName]=useState("");
    if(user){
        json=parseJwt(user?.jwtToken);
    }
    useEffect(()=>{
        fetch(`http://localhost:8080/api/couriers/${json.login}`,{
            method:"GET",
            headers:{
                'Authorization':"Bearer "+user["jwtToken"]
            }
        })
        .then(x=>{error_handler(x,logout);return x.json()})
        .then(x=>{
            cli.setClient(x);
            let name=x.name+" "+x.surname;
            setName(name);
        })
        .catch(x=>alert('У нас не поладки'));
    },[cli?.client?.name,cli?.client?.surname])


    
    return (
        <>
        {/* {dataOrd&&<Order data={dataOrd} className="float"/>} */}
        <div className="divNavColomn">
            <h2 className="panelH2">Профиль</h2>
            <LoginUser login={name}/>
            <nav>                
                
                    
                    <NavLink to='data' className={
                        ({isActive})=>isActive?(s+" activeLink"):s
                    }>Мои Данные</NavLink>
                    <NavLink to='orders' className={
                        ({isActive})=>isActive?(s+" activeLink"):s
                    }>Мои Заказы</NavLink>
                    <NavLink to='new_orders' className={
                        ({isActive})=>isActive?(s+" activeLink"):s
                    }>Новые заказы</NavLink>
                   

                    <span className={s} style={{
                        fontSize:"15px",
                        color:"#B5B4B4"
                    }}>
                        
                    </span>
                    
            </nav>
            <div className="logoutCL"><span  className="logOut link" onClick={()=>logout()}>Выйти</span></div>
        </div>
        </>
    )/*"widthSize link" */
}
export default NavMain;