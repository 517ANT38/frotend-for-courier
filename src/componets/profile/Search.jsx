import { useNavigate } from "react-router-dom";
import { useAuth } from "../../security/auth";
import { useContext, useState } from "react";
import { error_handler, newId, parseJwt } from "../../util/util";
import { CtxKeys, CtxOrdSe } from "../../Contexts/Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faMultiply } from "@fortawesome/free-solid-svg-icons";

function Search(){
    const [name,setName]=useState("");
    const {logout,user}=useAuth();
    const headers={'Authorization':"Bearer "+user["jwtToken"]}
    const keys=useContext(CtxKeys);
    const nav=useNavigate();
    const [setOrders,func]=useContext(CtxOrdSe);
    const json=parseJwt(user["jwtToken"]);  
    const search=(nameRes)=>{
        setOrders([])
        fetch(`http://localhost:8080/api/orders/${keys.get(nameRes)?keys.get(nameRes):""}/courier/${json.id}`,{
            method:"GET",
            headers:headers
        })               
        .then(x=>{
            error_handler(x,logout);
            if(x.status==404){
                return null;
            }
            
            return x.json()   
        })
        .then(x=>{setOrders([{normId:newId(x),...x}])}) 
        .catch(x=>alert('У нас не поладки'))
         
    }
    return (
        <div className="input-box">      
            <FontAwesomeIcon icon={faMagnifyingGlass} className="svgSearh" />
            {name.length>0&&<FontAwesomeIcon icon={faMultiply} style={{
                left:"500px"
            }} onClick={()=>{
                
                func();
                setName("");
                nav('../orders')
            }} className="svgSearh"/>}       
            <input 
                type="text" 
                placeholder="Найти заказ  "
                value={name} 
                className="searchInput"
                onChange={e=>setName(e.target.value)}
                />
            <button 
            type="button" 
            className="searchButton" style={{marginLeft:"2px"}}
            onClick={()=>{search(name);nav(name)}}
            >Найти</button>
        </div>
    )
}
export default Search;