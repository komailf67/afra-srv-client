import React from "react";
import {Button} from "react-bootstrap";
import $ from "jquery";
import {dispatchActions} from "../../../../redux/actions";
import {connect} from "react-redux";
import {ADD_CATEGORY, UPDATE_ACCESS} from "../../consts/actionsConstants";


const UsersItem = (props) => {
    let {user, row} = props;
    const update = (prop, user, row) => {
        let userAccess = {};
        userAccess['user_id'] = user.id;
        userAccess['orders'] = $(`.userDetails#${row} input[name="orders"]`).is(':checked');
        userAccess['products_list'] = $(`.userDetails#${row} input[name="products_list"]`).is(':checked');
        userAccess['pre_invoices'] = $(`.userDetails#${row} input[name="pre_invoices"]`).is(':checked');
        userAccess['products'] = $(`.userDetails#${row} input[name="products"]`).is(':checked');

        props.fetchData('http://automation.afra.local/api/users/update-access', UPDATE_ACCESS, userAccess, localStorage.getItem('access_token') )
    }

    let {user_access} = user;
    let name = `${user.name} ${user.family}`;
    return (
        <tr id={row} className="userDetails">
            <td>{row+1}</td>
            <td>{name}</td>
            <td>{user.roles}</td>
            {/*{user_access.orders ? <td><div className="checkbox-in-table"><input type="checkbox" checked onClick={(e) => komail(e)} /></div></td> : <td><div className="checkbox-in-table"><input type="checkbox" /></div></td>}*/}
            <td>
                <div className="checkbox-in-table">
            <input
                // id="ali"
                name="orders"
                type="checkbox"
                defaultChecked={user_access.orders}
            />
                </div>
            </td>
            <td>
                <div className="checkbox-in-table">
                    <input
                        name="products_list"
                        type="checkbox"
                        defaultChecked={user_access.products_list}
                    />
                </div>
            </td>
            <td>
                <div className="checkbox-in-table">
                    <input
                        name="pre_invoices"
                        type="checkbox"
                        defaultChecked={user_access.pre_invoices}
                    />
                </div>
            </td>
            <td>
                <div className="checkbox-in-table">
                    <input
                        name="products"
                        type="checkbox"
                        defaultChecked={user_access.products}
                    />
                </div>
            </td>
            {/*{user_access.products ? <td><div className="checkbox-in-table"><input type="checkbox" checked/></div></td> : <td><div className="checkbox-in-table"><input type="checkbox" /></div></td>}*/}
            <td>
                <Button variant="primary" type="button" size="sm" onClick={(e) => update(props, user, row)}>
                    update
                </Button>
            </td>
        </tr>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data, token) => dispatch(dispatchActions(url, actionType, data, token)),
    }
}

export default connect(null, mapDispatchToProps)(UsersItem);