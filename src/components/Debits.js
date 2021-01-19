import React, { Component } from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Debits extends Component {

    constructor(){
        super();
        this.state = {
            description: "",
            amount: 0,
        }
        this.addDescription = this.addDescription.bind(this);
        this.addAmount = this.addAmount.bind(this);
        this.saveContent = this.saveContent.bind(this);
    }

    
    addDescription(e){  //updates the description of the debit that the user is adding.
        this.setState({description: e.target.value});
    }

    addAmount(e){   //updates the amount of the debit that the user is adding.
        this.setState({amount: e.target.value});
    }

    saveContent(e){  //gets current timestamp and creates object for the new user-added debit
        e.preventDefault();
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+"T" 
        + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        console.log("timestamp: " + date);
        let obj ={
            description: this.state.description,
            amount:this.state.amount,
            date: date,
            id: "799b163d-c33b-4608-a85c-5b7e42a9eb9f",
        }
        this.props.updateBalance(obj);
    }



  render() {
    console.log("In Debits Component: ")
    return (
        <div>

            {/* Display account balance: */}
            <AccountBalance accountBalance={this.props.accountBalance}/>

            {/* Debit page header */}
            <h1>Debits</h1>

            {/* Display list of debits with info */}
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

            <br/>

            {/* Form for user to input a new debit */}
            <form>
                Add a new debit:<br/>
                <label>Description:<input type="text" onChange={this.addDescription}/></label><br/>
                <label>Debit Amount:<input type="text" onChange={this.addAmount} /></label><br/>
                <input type="submit" onClick={this.saveContent} />
            </form>


        </div>
    );
  }
}

export default Debits;
