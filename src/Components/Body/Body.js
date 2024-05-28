import './Body.css';
import React from 'react';
import Restrocard from '../RestroCard/RestroCard';
import SortMenu from '../SortMenu/SortMenu';
import {getNumericRating, setOptions} from './Helper';
import useDebounce from '../../CustomHooks/Debounce';
import { MagnifyingGlassIcon} from '@heroicons/react/20/solid';
import useFetch from '../../CustomHooks/Fetch';
import RestroCardSkeleton from '../../utils/Common/RestroCardSkeleton';
import usePageBottom from '../../CustomHooks/PageBottom';
import BannerItems from '../BannerItems/BannerItems';

function RestaurantBody(){
    const [searchTerm, setSearchTerm] = React.useState('');
    const [nextpage, setNextPage] = React.useState("10");
    const options = React.useMemo(()=>setOptions(nextpage),[nextpage]);
    const {loading: busy, error, data : rData} = useFetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/update", options);
    const [restData, setResdata] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [loading, setLoading] = React.useState(busy);
    const emArray = new Array(15).fill(undefined);

    const reachedBottom = usePageBottom();

    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    const HandleSearch=()=>{
        const tempData = restData;
        tempData != undefined && setFilteredData(tempData.filter((item) => item.info.name.toLocaleUpperCase().includes(debouncedSearchTerm?.toLocaleUpperCase())));
    }

    React.useEffect(()=>{
            const newData = rData?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            newData != undefined && setResdata(prevData => {
                if (!prevData || !Array.isArray(prevData)) {
                    return [...newData];
                } else {
                    const uniqueNewData = newData.filter(newItem => !prevData.some(prevItem => prevItem.info.id === newItem.info.id));
                    return [...prevData, ...uniqueNewData];
                }
            });
            setFilteredData(restData);
        setLoading(busy);
        if(debouncedSearchTerm != undefined && debouncedSearchTerm != null  && debouncedSearchTerm != "") HandleSearch();
        if (reachedBottom) {
            setNextPage((prev) => String(Number(prev) + 15));
          }
    },[debouncedSearchTerm, rData, busy, reachedBottom]);


    const HandleSort=(id)=>{
        if(id == 1){
            setFilteredData((prev)=>{const SortedArray = [...prev].sort((a,b)=> getNumericRating(a.info.sla.slaString) - getNumericRating(b.info.sla.slaString));
                return SortedArray;
            });
        }
        if(id === 2){
            setFilteredData((prev)=>{const SortedArray = [...prev].sort((a,b)=> getNumericRating(b.info.avgRating) - getNumericRating(a.info.avgRating));
            return SortedArray;
        });
        };
    }

    const HandleReset=()=>{
        const tempData = [...restData];
        setFilteredData(tempData);
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
            <div>
            <BannerItems />
            </div>
            <div className='restro-card-conainer'>
                { loading ? (
                <div className='restro-card'>
                    {emArray?.map((_,index)=>{
                        return (<RestroCardSkeleton key={index}/>)
                    })}
                </div>) :
                (<div className='restro-card'>
                    { filteredData?.map((item)=>{
                        return(<Restrocard key={item?.info?.id} storeData={item} />);
                    })}
                </div>)}
                
            </div>
        </div>
    )
}

export default RestaurantBody;