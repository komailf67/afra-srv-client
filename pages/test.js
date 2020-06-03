import React , { Component } from "react";
import {products} from '../redux/actions'
import { connect } from 'react-redux';


class Test extends Component {

  componentDidMount = () => {
    
  }
  
  render(){


    return(
      <div>
        <h1>komail</h1>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // test:() => dispatch(products())
    // fetchData: (url , actionType) => dispatch(dispatchActions(url , actionType)),

      // initialCards: bindActionCreators(initialCards, dispatch),
      // addItem: bindActionCreators(addItem, dispatch),
      // komail: bindActionCreators(products, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    // products: state.products
  }
}

export default Test;
// export default connect(mapStateToProps, mapDispatchToProps)(Test);