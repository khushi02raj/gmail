import axios from 'axios';

const API_URL='';
const API_GMAIL=async(urlObject,payload,type)=>{
    //using axios api as fun. and passing obj
    return await axios({
        method:urlObject.method,
        url:`${API_URL}/${urlObject.endpoint}/${type}`,
        data:payload
    })
}
export default API_GMAIL;
