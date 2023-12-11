import { useContext, useEffect } from "react";
import { CtxClient } from "../../Contexts/Contexts";
import { useAuth } from "../../security/auth";
import { ProtectedRoute } from "../authComponents/ProtectedRoute";
import { error_handler, parseJwt } from "../../util/util";
export function DataClient(){
    const cl=useContext(CtxClient);
    const {user,logout}=useAuth();
 
    const json=user?parseJwt(user["jwtToken"]):{};
    const onFormSubmit = e => {
        e.preventDefault();
        
      };

    const update=()=>{
        cl.setClient({...cl.client});
        fetch(`http://localhost:8080/api/couriers/${json.id}`,{
            method:"PATCH",
            headers:{
                'Content-Type':'application/json;charset=utf-8',
                'Authorization':"Bearer "+user["jwtToken"]
            },
            body:JSON.stringify(cl.client)
        }).then(x=>{error_handler(x,logout);return x})
        .catch(x=>alert('У нас не поладки'))
    }  
    return(
        <div className="panelRes">
            <form action="" onSubmit={onFormSubmit} className="formFlex">
                <fieldset className="propFieldSet">
                    <label htmlFor="name">Имя: </label>
                    <input type="text" name="name" defaultValue={cl.client.name} onChange={e=>{
                        cl.client.name=e.target.value
                    }}/>
                </fieldset>
                <fieldset className="propFieldSet">
                    <label htmlFor="name">Фамилия: </label>
                    <input type="text" name="surname" defaultValue={cl.client.surname} 
                    onChange={e=>cl.client.surname=e.target.value}/>
                </fieldset>
                <fieldset className="propFieldSet">
                    <label htmlFor="pat">Отчество: </label>
                    <input type="text" name="pat" defaultValue={cl.client.patronymic} onChange={e=>{
                        cl.client.patronymic=e.target.value
                    }}/>
                </fieldset>
                <fieldset className="propFieldSet">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" defaultValue={cl.client.email}
                    onChange={e=>cl.client.email=e.target.value} />
                </fieldset>
                <fieldset className="propFieldSet">
                    <label htmlFor="tel">Телефон: </label>
                    <input type="tel" name="tel" defaultValue={cl.client.phone}
                    onChange={e=>cl.client.phone=e.target.value}/>
                </fieldset>
                <fieldset className="propFieldSet">
                    <label htmlFor="card">Номер карты: </label>
                    <input type="text" defaultValue={cl.client.numCard}
                    onChange={e=>cl.client.numKarta=e.target.value}/>
                </fieldset>
                <fieldset className="propFieldSet">
                    <label htmlFor="l">Логин: </label>
                    <input type="text" defaultValue={cl.client.login} disabled/>
                </fieldset>
                <ProtectedRoute>
                 <input type="submit" value="Изменить" className="changeBut" onClick={update}/>
                </ProtectedRoute>
            </form>
        </div>
    )
}