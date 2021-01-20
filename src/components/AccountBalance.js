import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    return (
        <div id="account-balance-component">
            <h2>Account balance: ${this.props.accountBalance}</h2>
        </div>
    );
  }
}

export default AccountBalance;