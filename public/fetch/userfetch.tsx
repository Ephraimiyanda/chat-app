import { useEffect,useState } from "react";

const useFetch=(url:string)=>{
    const [user,setuser]=useState([]);

    useEffect(()=>{
        fetch(url)
        .then(res=>{
         return res.json()
        })
        .then(data=>{
        setuser(data)
        })
        .catch()
       },
       [url]);
    return{user}
}
export default useFetch;