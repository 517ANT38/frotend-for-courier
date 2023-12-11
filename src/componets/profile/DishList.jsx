import { DishItem } from "./DishItem";

export function DishList({dishes,setState}){
    return (
        <div style={{
            position:"absolute",
            height:"200px",
            overflowY:"auto",
            overflowX:"hidden",
            width:"280px",
            top:"90px",
            borderRadius:"20px",
            right:"-80px",
            backgroundColor:"#FFF",
            textAlign:"center",
            padding:"8px",
            zIndex:"100"
            }} onMouseLeave={()=>setState(false)}>
            <h4 className="prop">Блюда заказа</h4>
            {dishes.map(x=><DishItem x={x}/>)}
        </div>
    )
}