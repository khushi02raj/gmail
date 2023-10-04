//custom hook to call api
//middleware
import API_GMAIL from "../services/api";
import { useState } from 'react'

const useApi=(urlObject)=>{
    const [response,setResponse]=useState(null);
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);

    const call=async(payload,type='')=>{
        setResponse(null);
        setError("");
        setLoading(true);
        try{
            let res=await API_GMAIL(urlObject,payload,type);
            setResponse(res.data);
        }
        catch(error)
        {
            setError(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    return {call,response,error,loading}
}
export default useApi;