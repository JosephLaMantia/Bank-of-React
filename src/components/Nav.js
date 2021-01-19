import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
    render() {
        return (
            <div className="nav-component">
                <button className="nav-button"><Link to="./">Home</Link></button>
                <button className="nav-button"><Link to="./userProfile">Profile</Link></button>
                <button className="nav-button"><Link to="./login">Login</Link></button>
                <button className="nav-button"><Link to="./debits">Debits</Link></button>
            </div>
        )
    }
}


