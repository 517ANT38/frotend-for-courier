
export function DishItem({x}){
    return (
        <div style={{marginTop:"5px",marginBottom:"5px",borderBottom:"2px solid #F6AC1C"}}>
            <p className="prop">
            
            <span>Название: </span>
            <span>
                {x.name}
            </span>
            
            </p>
            <p className="prop">
            
            <span>Стоимость: </span>
            <span>
                {x.cost} 
            </span>
            
            </p>
            <p className="prop">
            
                <span>Количество: </span>
                <span>
                    {x.count} шт
                </span>
                
            </p>
        </div>
    )
}