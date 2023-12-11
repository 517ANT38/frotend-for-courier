import personImg from "../../images/Person.svg";
function LoginUser({login}){
    
    return (
        <div className="divPerImg">
            <img src={personImg} alt="" srcset=""  className="imgPerson"/>
            <span className="nameUser" style={login.length<=10?{marginRight:"50px",fontSize:"20px"}:{}}>{login}</span>
        </div>
    )
}
export default LoginUser;