import { useState } from "react";
import { error_handler } from "../../util/util";
import { useAuth } from "../../security/auth";

function FormLogIn(){
    const [loginP,setLogin]=useState("");
    const [pwd,setPwd]=useState("");
    const {login}=useAuth();
    const onFormSubmit = e => {
        e.preventDefault();
        
    };
    const account=()=>fetch("http://localhost:8080/api/auth/login",{
        method:"POST",
        headers:{
            'Content-Type':'application/json;charset=utf-8',
        },
        body:JSON.stringify({
            login:loginP,
            password:pwd
        })
    }).then(x=>{error_handler(x);return x.json()})
    .then(x=>login(x))
    .catch(x=>alert('У нас не поладки'))
    return (
        <form action="" method="POST"  className="authForm" onSubmit={onFormSubmit}>
           <fieldset className="fieldsetLogIn">
            <label htmlFor="login">Логин</label> 
            <input type="text" name="login" onChange={e=>setLogin(e.target.value)}/>
           </fieldset>
           <fieldset className="fieldsetLogIn">
                <label htmlFor="password">Пароль</label> 
                <input type="password" name="password" onChange={e=>setPwd(e.target.value)}/>
           </fieldset>
           <input className="butAuth" type="submit" value="Войти" onClick={account} />
        </form>
    )
}
export default FormLogIn;