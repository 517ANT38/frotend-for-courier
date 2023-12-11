
import {  CtxCoordinate, CtxMapOpen } from "../../Contexts/Contexts";
import React, { useContext, useEffect, useState } from "react";
import { GeolocationControl, Map,ZoomControl } from "@pbe/react-yandex-maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

function BoxMap({styl={}}){
    const [ymaps,setYmaps] = useState({});
    const setState=useContext(CtxMapOpen);
    const coords=useContext(CtxCoordinate);
    const [position,setP]=useState([]);
    const [lat,setLan]=useState(51.32);
    const [lon,setLon]=useState(46.00);
    const mapRef = React.useRef(null);
    useEffect(()=>{

        ymaps?.geolocation?.get({
            provider: 'browser',
            mapStateAutoApply: true,
            autoReverseGeocode: false
        }).then(function (result) {
            result.geoObjects.options.set('preset', 'islands#redCircleIcon');
            result.geoObjects.get(0).properties.set({
                balloonContentBody: 'Мое местоположение'
            });
             mapRef.current.geoObjects.removeAll()
            if('multiRouter' in ymaps){
                const multiRoute = new ymaps.multiRouter.MultiRoute(
                    {
                        
                        referencePoints: [result.geoObjects.position, [coords?.lat,coords?.lon]],
                        params: {
                        routingMode: "pedestrian"
                        }
                    },
                    {
                        boundsAutoApply: true
                    }
                );
                    mapRef.current.geoObjects.add(multiRoute);
            }
            mapRef.current.geoObjects.add(result.geoObjects);
            
        }).catch(x=>alert('У нас не поладки'));
    })
   


   
 
   
    
    return (
        
                <div className="boxMap" style={styl}>
                    
                    <div className="box-min-map" style={{height:"max-content"}}>
                             <p className="pFaCl" style={{marginLeft:"850px",marginTop:"10px"}} onClick={()=>{setState(false);}}>
                             <FontAwesomeIcon icon={faWindowClose} className="faCl"/>
                            </p>
                            <h3 className="prop" style={{marginLeft:"400px",marginBottom:"10px",color:"#F6AC1C"}}>
                                Маршрут
                            </h3>
                        <Map    style={{height:"600px"}}                 
                        modules={["geolocation","geocode","multiRouter.MultiRoute"]}
                        onLoad={(ympasInstance) => (setYmaps( ympasInstance))}
                        state={{ center: [lat, lon], zoom: 10,controls:[] }}
                        instanceRef={mapRef}
                        options={{yandexMapDisablePoiInteractivity: true}}
                        className="map">
                            
                            <ZoomControl options={{ float: "left" }} />
                            
                        </Map>
                    </div>
                </div>
    )
   
}
export default BoxMap;