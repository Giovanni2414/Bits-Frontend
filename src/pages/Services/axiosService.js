import axios from 'axios'

//export const LOGIN = 'realms/keycloak-react-auth/protocol/openid-connect/token'
export const LOGIN = 'login'
export const REGISTER = 'users'
export const SESSIONS = 'sessions'
export const BLOBS = 'blobs'
export const SESSIONS_NAME = 'sessions/search'

export class CRUDService {

    static baseURL = 'http://' + process.env.REACT_APP_BACKEND_URL + ':' + process.env.REACT_APP_BACKEND_PORT + '/'

    static post(postInformation, serviceRoute) {

        var url = this.baseURL + serviceRoute

        return axios.post(url, postInformation.data, postInformation.headers)
            .then(res => res)
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    alert("ERROR " + error.response.data.code + "\n" + error.response.data.message);

                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
    }

    static getAll(serviceRoute) {

        var url = this.baseURL + serviceRoute;

        const config = this.getHeaderConfig();
        return axios.get(
            url, config
        ).then(res => res.data);
    }

    static getOne(serviceRoute, itemID) {
        const url = this.baseURL + serviceRoute + '/' + itemID
        const config = this.getHeaderConfig();

        return axios.get(
            url, config
        ).then(res => res.data);
    }

    static delete(serviceRoute, itemID) {
        const url = this.baseURL + serviceRoute + '/' + itemID
        const config = this.getHeaderConfig();

        return axios.delete(
            url, config
        ).then(res => res);
    }

    static getHeaderConfig() {

        const webToken = localStorage.getItem("token") ? localStorage.getItem("token") : '';

        const config = {
            headers: { Authorization: 'Bearer ' + webToken }
        };
        return config;
    }

}