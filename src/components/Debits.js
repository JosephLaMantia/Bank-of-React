import React, { Component } from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Debits extends Component {
  render() {
    return (
        <div>
            <AccountBalance accountBalance={this.props.accountBalance}/>


            <h1>Debits</h1>
            <table>
                <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                </tr>
                {this.props.data.map((data) => {
                    return (
                        <tr key={data.id}>
                            <td>
                                {data.description}
                            </td>
                            <td>
                                {data.amount}
                            </td>
                            <td>
                                {data.date}
                            </td>
                        </tr>
                    )
                } )}
            </table>
        </div>
    );
  }
}

export default Debits;
