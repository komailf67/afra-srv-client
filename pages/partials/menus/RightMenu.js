import React, {Component} from "react";
import AdminMenu from "./roleMenu/adminMenu";
import SellerMenu from "./roleMenu/sellerMenu";

class RightMenu extends Component {
    state = {
        role: ''
    }

    componentDidMount = () => {
        this.setState({
            role: localStorage.getItem('role')
        })
    }

    render() {
        let menu;

        switch (this.state.role) {
            case 'admin' :
                menu = <AdminMenu/>
                break;
            case 'seller' :
                menu = <SellerMenu/>
                break;
            default :
                menu = <SellerMenu/>
        }

        return (
            <React.Fragment>
                {menu}
            </React.Fragment>
        )
    }
}

export default RightMenu;