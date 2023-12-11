import { useEffect, useState } from "react";
import { useAuth } from "../../security/auth";
import { error_handler, parseJwt } from "../../util/util";
import {CtxMapIds} from './../../Contexts/Contexts'
import { Order } from "./Order";
import { Link, NavLink } from "react-router-dom";
export function OrdersFree(){
    let s="widthSize link";
    const [isActive,setIs]=useState(0);
    const [orders,setOrders]=useState([]);
    const {user,logout}=useAuth();
    const [mapIds,setMapIds]=useState(new Map());
    const json=parseJwt(user["jwtToken"]);
    useEffect(()=>{
        fetch(`http://localhost:8080/api/orders/free`,{
            method:"GET",
            headers:{
                'Authorization':"Bearer "+user["jwtToken"]
            }
        }).then(x=>{error_handler(x,logout);return x.json();})
        .then(x=>{
            
            let a=x.map((y)=>{
                let normId=y.uuid.substring(0,4)+y.uuid.substring(32);
                normId=normId.toUpperCase() 
                mapIds.set(normId,y.uuid);
                return {...y,normId:normId}
                
            });
            setOrders(a);
        })
        .catch(x=>alert('У нас не поладки'));
    },[])
    
    
    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            marginTop:"30px"
            
        }}>
            <h2 className="prop" style={{fontSize:"30px"}}>
                Новые заказы
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
                {orders.length==0&&<h3 className="prop" style={{fontSize:"30px"}}>Заказов пока нет</h3>}
            </div>
        </div>
    )
}