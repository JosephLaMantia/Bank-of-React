import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserProfile extends Component {
  render() {
    return (
        <div>

          <h1>User Profile</h1>

          <div id="user-name">Username: {this.props.userName}</div>
          <div id="member-since">Member Since: {this.props.memberSince}</div>
        </div>
    );
  }
}

export default UserProfile;