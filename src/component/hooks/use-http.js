import {useState, useCallback} from 'react';

const url ="https://desidelishine-default-rtdb.firebaseio.com/";
const useHttp = ()=>{
    const[isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest= useCallback(async (requestConfiq, applyData)=>{
        setIsLoading(true);
        setError(null);
        try{
            const response = await fetch(
                `${url}${requestConfiq.url}`,{
                    method: requestConfiq.method ? requestConfiq.method :'GET',
                    headers: requestConfiq.headers ? requestConfiq:{},
                    body: requestConfiq.body ? JSON.stringify(requestConfiq.body):null
                }
            );
            if(!response.ok){
                throw new Error('Request Failed!');
            }
            const data = await response.json();
            applyData(data);


        }catch(error){
            setError(error.message || "Something went Wrong");
        }
        setIsLoading(false);
        
    },[])
    
    return{
        isLoading, 
        error, 
        sendRequest,
    }
}

export default useHttp;