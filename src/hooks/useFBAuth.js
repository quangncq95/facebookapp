import { useContext } from "react";
import { FacebookAuthContext } from "../context/FacebookAuthContext";



export default function useFBAuth(){
    const auth = useContext(FacebookAuthContext)
    return auth;
}