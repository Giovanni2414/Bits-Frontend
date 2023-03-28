import React, { Component } from 'react';
import Keycloak from 'keycloak-js';

class HomeTest extends Component {
    
    constructor(props) {
        super(props)
        this.state = { keycloak: null, authenticated: false }
    }
    
    componentDidMount() {
        const keycloak = new  Keycloak('/keycloak.json');
        keycloak.init({onLoad: 'login-required'}).then(authenticated =>{
            this.setState({ keycloak: keycloak, authenticated: authenticated})
        })
    }

    render() {
        if(this.state.keycloak) {
            if(this.state.authenticated) return (
                <p>Hpta por fin</p>
            ); else return(<div>Unable to authenticated</div>);
        }

        return (
            <div>
                <h1>Esta seria la home page</h1>
            </div>
        );
    }
}

export default HomeTest;
