import './Body.css';
import resData from '../../utils/MockData/ResturantData';
import React from 'react';
import Restrocard from '../RestroCard/RestroCard';
import SortMenu from '../SortMenu/SortMenu';
import {getNumericRating} from './Helper';
import useDebounce from '../../CustomHooks/Debounce';
import { MagnifyingGlassIcon} from '@heroicons/react/20/solid';

function RestaurantBody(){
    const [restData, setResdata] = React.useState(resData);
    const [searchTerm, setSearchTerm] = React.useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    const HandleSearch=()=>{
        const tempData = resData;
        setResdata(tempData.filter((item) => item.store.title.text.toLocaleUpperCase().includes(debouncedSearchTerm?.toLocaleUpperCase())));
    }

    React.useEffect(()=>{
        if(debouncedSearchTerm != undefined) HandleSearch();
    },[debouncedSearchTerm, resData]);


    const HandleSort=(id)=>{
        if(id == 1){
            setResdata((prev)=>{const SortedArray = [...prev].sort((a,b)=> getNumericRating(a.store.tracking.storePayload.etdInfo.dropoffETARange.min) - getNumericRating(b.store.tracking.storePayload.etdInfo.dropoffETARange.min));
                return SortedArray;
            });
        }
        if(id === 2){
        setResdata((prev)=>{const SortedArray = [...prev].sort((a,b)=> getNumericRating(b.store.rating?.text) - getNumericRating(a.store.rating?.text));
            return SortedArray;
        });
        };
    }

    const HandleReset=()=>{
        setResdata(resData);
    }

    return(
        <div className='body-wraper pt-60 px-10 pb-10'>
            <div className='custmoizations p-3 py-10'>
            <div className=" bg-gray-100 search-bar flex items-center pl-4 pr-10 rounded-3xl">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                <input onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm} className=' bg-gray-100 search-input focus:outline-none flex-grow' />
            </div>
            <div className='filters-wrap'>
                <SortMenu HandleSort={HandleSort} HandleReset={HandleReset}/>
            </div>
            </div>
            <div className='restro-card-conainer'>
                <div className='restro-card'>
                    {restData?.map((item)=>{
                        return(<Restrocard key={item.uuid} storeData={item} />);
                    })}
                </div>
            </div>
        </div>
    )
}

export default RestaurantBody;