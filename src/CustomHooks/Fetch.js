import React from 'react'; 

function useFetch(url, options={}){
    const[loading, setLoading] = React.useState(true);
    const[data, setData] = React.useState(null); 
    const[error, setError] = React.useState(null); 


    React.useEffect(()=>{
        async function FetchData(){
            try{
            const response = await fetch(url, {...options});
            const data = await response.json();
            setData(data);
            setLoading(false);
            }
            catch(error){
                setLoading(false);
                setError(error);
            }
        }
        FetchData();
    },[url,options]);

    return {loading, error, data};
}

export default useFetch;