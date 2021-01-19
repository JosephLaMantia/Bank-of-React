import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Nav from "./components/Nav";
import LogIn from "./components/Login";
import Debits from "./components/Debits";
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99",
      },
      debitInfo: [],
      debitAmount: 0,
      creditInfo: [],
      creditAmount: 0,
    };
    this.updateDebit = this.updateDebit.bind(this);
    this.updateCredit = this.updateCredit.bind(this);
  }

  componentDidMount = () => {
    console.log("In componentDidMount");

    //Set up a counter for debits and credits
    let debits = 0;
    let credits = 0;

    // fetch debits:
    console.log("fetch debits:");
    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then((res) => {
        this.setState({
          debitInfo: res.data,  //loads debit info from api into state
        });
        res.data.forEach((data) => {  //for each debit,
          debits += data.amount;      //add the amount to our counter
        });
        this.setState({
          debitAmount: debits,  //sets debit amount in state to the amount of our counter
        });
      })
      .catch((error) => console.log("Loading debits error" + error));

    // fetch credits:
    console.log("fetch credits:");
    axios
      .get("https://moj-api.herokuapp.com/credits")
      .then((res) => {
        this.setState({
          creditInfo: res.data, //loads credit info from api into state
        });
        res.data.forEach((data) => {  //for each credit,
          credits += data.amount;     //add the amount to our counter
        });
        this.setState({
          creditAmount: debits, //sets credit amount in state to the amount of our counter
        });
      })
      .catch((error) => console.log("Loading credits error" + error));
  };


  updateDebit(object){
    this.state.debitInfo.push(object);
    this.setState({
      debitAmount: this.state.debitAmount - Number(object.amount)
    });
  }

  updateCredit(object){
    this.state.creditInfo.push(object);
    this.setState({
      creditAmount: this.state.creditAmount + Number(object.amount)
    });
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  render() {
    let totalAccountBalance = this.state.accountBalance + this.state.debitAmount - this.state.creditAmount;
    const HomeComponent = () => (
      <Home accountBalance={totalAccountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    );
    const DebitsComponent = () => (
      <Debits
        accountBalance={totalAccountBalance}
        updateBalance={this.updateDebit}
        data={this.state.debitInfo}
      />
    );

    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
