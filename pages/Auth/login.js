import React, {Component} from "react";

import axios from 'axios';
import $ from "jquery";


class Login extends Component {
    componentDidMount = () => {
        let token = localStorage.getItem('access_token');
        // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjFcL2FwaVwvbG9naW4iLCJpYXQiOjE1OTExODEyNjQsImV4cCI6MTU5MTE4NDg2NSwibmJmIjoxNTkxMTgxMjY1LCJqdGkiOiJRQnJXVFVOV2FRYW9sRWowIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.eBW5u-Q_VUh6eLIhKQaYQQbGhzG1FlaSasLW0XeCgxI';
        let config = {
            headers: {'Authorization': "bearer " + token}
        };
        //TODO
        //TODO error messages
        axios.get(
            '/api/is-token-valid',
            config
        ).then(response => {
            // let{success , message} = response.data;
        }).catch(error => {

        });
    }

    login = () => {
        axios.post('http://automation.afra.local/api/login', {
            email: $('#email').val(),
            password: $('#password').val(),
            role: $('#roles').val()
        })
            .then(response => {
                let {success, message, token, role} = response.data;
                localStorage.setItem('access_token', token);
                localStorage.setItem('role', role);
                window.location.replace("/");
            }).catch(error => {
        })
    };

    render() {
        return (
            <div>
                <input id="email" placeholder="email"/>
                <input id="password" placeholder="password"/>
                <select name="cars" id="roles">
                    <option value="admin">مدیر</option>
                    <option value="seller">فروشنده</option>
                    <option value="storekeeper">انباردار</option>
                </select>
                <input onClick={() => {
                    this.login()
                }} type="button" value="login"/>
            </div>
        )
    }
}

export default Login;
