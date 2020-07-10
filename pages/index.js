import React, {Component} from "react";
import Login from "./auth/login";
import Home from "./home";
import {
    IS_TOKEN_VALID,
    LOADING,
} from "./partials/consts/actionsConstants";
import {dispatchActions} from "../redux/actions";
import {connect} from "react-redux";
import Loading from "../Components/Loading/Loading";


class Index extends Component {
    state = {
        isUserLoggedIn: LOADING
    }
    componentDidMount = () => {
        let token = localStorage.getItem('access_token');
        // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvhXC8xMjcuMC4wLjE6ODAwMVwvYXBpXC91c2VyXC9sb2dpbiIsImlhdCI6MTU3ODA0MjU3MywiZXhwIjoxNTc4MDQ2MTczLCJuYmYiOjE1NzgwNDI1NzMsImp0aSI6Im5YYUw5V25hNnFxcHV0TG0iLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.v4G7zJfEBTO-Fw0iWyq1_eW3UPwbNv6PaK5c6LPIiDs';
        let config = {
            headers: {'Authorization': "bearer " + token}
        };
        this.props.fetchData('http://automation.afra.local/api/is-token-valid', IS_TOKEN_VALID, config);
    }

    render() {

        let {isUserLoggedIn} = this.props
        let componentToShow;

        switch (isUserLoggedIn) {
            case true:
                componentToShow = <Home/>;
                break;
            case false:
                componentToShow = <Login/>;
                break;
            default:
                componentToShow = <Loading/>;
                break;
        }

        return (
            <React.Fragment>
                {componentToShow}
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data) => dispatch(dispatchActions(url, actionType, data)),
    }
}
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.auth.isUserLoggedIn
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
