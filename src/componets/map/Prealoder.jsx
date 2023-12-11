import { CtxCoordinate } from "../../Contexts/Contexts";
import BoxMap from "./BoxMap";

function Prealoder({coords}){
    
    return (
        <CtxCoordinate.Provider value={coords}>
            <div className="prealoader">
                <BoxMap />
            </div>
        </CtxCoordinate.Provider>
    );
   
}
export default Prealoder;