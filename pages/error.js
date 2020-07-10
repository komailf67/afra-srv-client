import React , { Component } from "react";
import { Card , Container , Row , Col } from "react-bootstrap";
import Content from "./partials/Content";
import RightMenu from "./partials/menus/RightMenu";
import {connect} from "react-redux";
import {dispatchActions} from "../redux/actions";

class Error extends Component {

    render(){
        let {message} = this.props.error;
        return(
            <React.Fragment>
                <Container>
                    <Row>
                        <RightMenu />
                        <Content title="خطای دسترسی!">
                            <h5>{message}</h5>
                        </Content>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data, token) => dispatch(dispatchActions(url, actionType, data, token)),
    }
}
const mapStateToProps = (state) => {
    return {
        error: state.error.error,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Error);