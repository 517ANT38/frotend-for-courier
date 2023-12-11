import { useState } from "react";
import { CtxMapL } from "../../Contexts/Contexts";
import { Outlet } from "react-router-dom";
import { Map } from "@pbe/react-yandex-maps";

export function MapLayout(){
    const [ymaps,setYmaps]=useState({});
    return(
        <CtxMapL.Provider value={[ymaps,setYmaps]}>
            <Map                     
                modules={["Placemark","geocode","geoObject.addon.balloon"]}
                onLoad={(ympasInstance) => (setYmaps( ympasInstance))}>
                <Outlet/>
            </Map>
        </CtxMapL.Provider>
    )
}