import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const instance = axios.create({
    baseURL:  'http://localhost:8081/'
})

const AxiosInterceptor = ({ children }) => {
    const [isSet, setIsSet] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {

        const resInterceptor = response => {
            return response;
        }

        const errInterceptor = error => {
            if (error.response.status === 401) {
                navigate('/');
            }

            return Promise.reject(error);
        }


        const interceptor = instance.interceptors.response.use(resInterceptor, errInterceptor);

        setIsSet(true)
        return () => instance.interceptors.response.eject(interceptor);
    }, [navigate])

    return isSet && children;
}


export default instance;
export { AxiosInterceptor }