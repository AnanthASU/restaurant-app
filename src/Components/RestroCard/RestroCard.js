import './RestroCard.css';

function Restrocard({storeData}){
    return(
        <div className='restro-card-wrapper shadow-md' >
            <div className='restro-card-header font-bold text-gray-700'>
                <h3>{storeData?.info?.name}</h3>
            </div>
            <div className='restro-card-body'>
                <img className='restro-card-image' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+storeData?.info?.cloudinaryImageId} />
            </div>
            <div className='restro-card-footer items-center'>
                <div>{storeData?.info?.sla?.slaString}</div>
                {storeData?.info?.avgRating && (
                <div className='rounded-full p-2 text-xs text-slate-800 bg-gray-100 font-bold'>{storeData?.info.avgRating}</div>)
}
            </div>
        </div>
    )
}

export default Restrocard;