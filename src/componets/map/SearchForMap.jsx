import { faMagnifyingGlass, faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { YMaps, useYMaps } from "@pbe/react-yandex-maps";
import { useContext, useEffect, useState } from "react";
import { CtxAddresP, CtxGeoCode, CtxMapAddress, CtxMapLonLan, CtxMapObjAddress, CtxMapOpen } from "../../../Contexts/Contexts";
import { error_handler, parseJwt, useLocalStorage } from "../../../util/util";
import { useAuth } from "../../../security/auth";

function SearchForMap(){
    const setState=useContext(CtxMapOpen);
    const geo=useContext(CtxGeoCode);
    const [address,setAddress]=useContext(CtxMapAddress);
    const obj=useContext(CtxAddresP);
    const [setLan,setLon]=useContext(CtxMapLonLan);
    const {user,logout}=useAuth();
    const objAddress=useContext(CtxMapObjAddress);
    const json=parseJwt(user["jwtToken"]);
    const newAddress=()=>fetch(`http://localhost:1212/api/clients/${json.id}/addresses/new`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'Authorization':"Bearer "+user["jwtToken"]
        },
        body:JSON.stringify(objAddress)
    }).then(x=>{error_handler(x,logout);obj?.arrAddr.push({...objAddress,main:true});obj?.setArrAddr([...obj.arrAddr]);setState(false);return x;});
    const myGeo=(str)=>{
           
            geo.geocode(str).then(x=>{
                const [a,b]=x.geoObjects.get(0).geometry.getCoordinates();
                setLan(a);
                setLon(b);
                return x;
            })
            .catch(x=>alert('У нас не поладки'));
        
        
    }
    return (
        <div className="input-box">      
            <FontAwesomeIcon icon={faMagnifyingGlass} className="svgSearh" /> 
            {(address.length>0)&&<FontAwesomeIcon icon={faMultiply} onClick={()=>setAddress("")} className="mplCL"/>  }     
            <input type="text" placeholder="Введите улицу или дом" className="searchInput" value={address} onChange={e=>{myGeo(e.target.value);setAddress(e.target.value)}}/>
            <button type="button" className="searchButton" onClick={newAddress} disabled={!address.length>0} style={(!address.length>0)?{opacity:"0.5"}:{}}>Ok</button>
        </div>
    )
}
export default SearchForMap;