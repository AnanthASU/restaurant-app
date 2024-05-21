import React from 'react';

function useDebounce(value, delay=300){

    const [term, setTerm] = React.useState(value);

    React.useEffect(()=>{
        const timer = setTimeout(()=>{
            setTerm(value);
        },delay);

        return ()=> clearTimeout(timer);
    },[value, delay]);

    return term;
};

export default useDebounce;