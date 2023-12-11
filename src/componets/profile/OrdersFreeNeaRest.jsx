import { useYMaps } from "@pbe/react-yandex-maps";
import { error_handler, newId, parseJwt, useInterval } from "../../util/util";
import { Order } from "./Order";
import { useAuth } from "../../security/auth";
import { useState } from "react";
import imgD from '../../images/Rotating-Pizza-Slice-Preloader.gif'
import { Link, NavLink } from "react-router-dom";
export function OrdersFreeNearst(){
    let s="widthSize link";
    const ymaps=useYMaps();
    const [coord,setCoord]=useState()
    const [orders,setOrders]=useState([]);
    const {user,logout}=useAuth();
    const [mapIds,setMapIds]=useState(new Map());
    const json=parseJwt(user["jwtToken"]);
    
    const [isActive,setIs]=useState(1);
    useInterval(async ()=>{
        try{ 
         let r=await ymaps.geolocation.get({
             provider: 'browser',
             mapStateAutoApply: true,
             autoReverseGeocode: false
         });
         let {position,...x}=r.geoObjects;
         setCoord({
             x:!position[0]?0:position[0],
             y:!position[1]?0:position[1],
         });
         fetch(`http://localhost:8080/api/orders/free/coordinates?x=${coord.x}&y=${coord.y}`,{
             method:"GET",
             headers:{
                 'Authorization':"Bearer "+user["jwtToken"]
             }
         })
         .then(x=>error_handler(x,logout)?x.json():null)
         .then(x=>setOrders(x.map(y=>{return{normId:newId(y),...y}})))
         .catch(x=>console.log(x))
     }catch(e){
         alert('У нас не поладки');
     }
     },1000)
    
    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            marginTop:"30px"
            
        }}>
            <h2 className="prop" style={{fontSize:"30px"}}>
                Ближайшие к вам  заказы на доставку
            </h2>
            <nav style={{display:"flex",width:"300px"}}>
                    <Link to='/courier/profile/new_orders' onClick={()=>setIs(0)} className={
                        (isActive==0)?(s+" activeLink"):s
                    }>Новые</Link>
                    <Link to='/courier/profile/new_orders/nearest' onClick={()=>setIs(1)} className={
                        isActive==1?(s+" activeLink"):s
                    }>Ближайшие</Link>
            </nav>
            <div className="ords" style={{display:"flex"}}>
            {orders.map(x=><Order data={x} fl={false}/>)}
                {orders.length==0&&<img src={imgD}/>}
            </div>
        </div>
    )
}