import { useContext, useEffect, useState } from "react"
import { useAuth } from "../../security/auth";
import { error_handler, parseJwt } from "../../util/util";
import { Order } from "./Order";
import { CtxKeys, CtxMapL, CtxOrdSe } from "../../Contexts/Contexts";
import Search from "./Search";

export function Orders(){
    const [orders,setOrders]=useState([]);
    const {user,logout}=useAuth();
    const [mapIds,setMapIds]=useState(new Map());
    const json=parseJwt(user["jwtToken"]);
    const func=()=>fetch(`http://localhost:8080/api/orders/courier/${json.id}`,{
        method:"GET",
        headers:{
            'Authorization':"Bearer "+user["jwtToken"]
        }
    }).then(x=>{error_handler(x,logout);return x.json();})
    .then(x=>{
        
        let a=x.map((y)=>{
            let normId=y.uuid.substring(0,4)+y.uuid.substring(32);
            normId=normId.toUpperCase() 
            mapIds.set(normId,y.id);
            return {...y,normId:normId}
            
        });
        setOrders(a);
    })
    .catch(x=>alert('У нас не поладки'));
    useEffect(()=>{
        func()
    },[])
   
    return (
        <CtxOrdSe.Provider value={[setOrders,func]}>
        <CtxKeys.Provider value={mapIds}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                marginTop:"30px"
                
            }}>
            
                <h2 className="prop" style={{fontSize:"30px"}}>
                    Мои заказы
                </h2>
                <Search/>
                <div className="ords" style={{display:"flex"}}>
                {orders.map(x=> <Order data={x}  fl={true}/>)}
                    {orders.length==0&&<h3 className="prop" style={{fontSize:"30px"}}>Заказов пока нет</h3>}
                </div>
            </div>
        </CtxKeys.Provider>
        </CtxOrdSe.Provider>
    )
}