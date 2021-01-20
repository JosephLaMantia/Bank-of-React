import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';


class Home extends Component {
    render() {
        return (
            <div id="bank-header">
                <h1>Bank of React</h1>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl_pK7PoAiIVaOLZsVd54F_5mt8M8pZ_3GPw&usqp=CAU" alt="bank"/>
                <br/><br/>
                <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
        );
    }
}

export default Home;