import axios from 'axios'

//export const LOGIN = 'realms/keycloak-react-auth/protocol/openid-connect/token'
export const LOGIN = 'login'
export const REGISTER = 'users' 

export class CRUDService {

    static baseURL = 'http://localhost:8081/'

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

}