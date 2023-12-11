import { Outlet } from "react-router-dom";

function ScrollLayout(){
    return (<div className=" scrollRestaurant">
            <Outlet />
    </div>)
}
export default ScrollLayout;