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
        debitInfo: [],
        debitAmount: 0,
        creditInfo: [],
        creditAmount: 0,
      },
    };
  }

  componentDidMount = () => {
    console.log("In componentDidMount");

    // Load in credits: 
    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then((res) => {
        let data = res.data;
        this.setState({debitInfo: data}); //Sets debitInfo to an array of all debit objects.
        for (let i = 0; i < data.length; i++) {
          //iterates through all debits
          this.setState({
            accountBalance: this.state.accountBalance - data[i].amount, //actually debits account balance
            debitAmount: this.state.debitAmount + data[i].amount, //adds up all debits
          });
        }
        console.log(this.state.debitInfo)
      })
      .catch((error) => console.log("Loading debits error" + error));

    // Load in debits:
    axios
      .get("https://moj-api.herokuapp.com/credits")
      .then((res) => {
        let data = res.data;
        this.setState({creditInfo: data});  //Sets creditInfo to an array of all credit objects.
        for (let i = 0; i < data.length; i++) {
          //iterates through all credits
          this.setState({
            accountBalance: this.state.accountBalance + data[i].amount, //actually credits account balance
            creditAmount: this.state.creditAmount + data[i].amount, //adds up all credits
          });
        }
        console.log(this.state.creditInfo)
      })
      .catch((error) => console.log("Loading credits error: " + error));
  };

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
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
        data = {this.state.debitInfo}
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
