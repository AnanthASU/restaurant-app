import './RestroCard.css';

function Restrocard({storeData}){
    return(
        <div className='restro-card-wrapper shadow-md' >
            <div className='restro-card-header font-bold text-gray-700'>
                <h3>{storeData.store.title?.text}</h3>
            </div>
            <div className='restro-card-body'>
                <img className='restro-card-image' src={storeData.store?.image?.items[4]?.url} />
            </div>
            <div className='restro-card-footer items-center'>
                <div>{storeData?.store?.meta[0]?.text}</div>
                {storeData?.store?.rating?.text && (
                <div className='rounded-full p-2 text-xs text-slate-800 bg-gray-100 font-bold'>{storeData?.store?.rating?.text}</div>)
}
            </div>
        </div>
    )
}

export default Restrocard;