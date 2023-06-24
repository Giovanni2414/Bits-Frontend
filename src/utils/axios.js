import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {logout} from "../reducers/authSlice";
import {useDispatch} from "react-redux";

const instance = axios.create({
    baseURL:  'http://' + process.env.REACT_APP_BACKEND_URL + ':' + process.env.REACT_APP_BACKEND_PORT + '/'
})

const AxiosInterceptor = ({ children }) => {
    const [isSet, setIsSet] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {

        const resInterceptor = response => {
            return response;
        }

        const errInterceptor = error => {
            if (error.response.status === 401 || error.response.status >= 500) {
                dispatch(logout());
            }

            return Promise.reject(error);
        }


        const interceptor = instance.interceptors.response.use(resInterceptor, errInterceptor);

        setIsSet(true)
        return () => instance.interceptors.response.eject(interceptor);
    }, [navigate, dispatch])

    return isSet && children;
}


export default instance;
export { AxiosInterceptor }