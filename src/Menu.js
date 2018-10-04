import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Menu extends Component {

    render() {
        return (
            <div>
                <Link to="/Main">Main</Link>
                <label>||</label>
                <Link to="/About">About</Link>
            </div>
        );
    }
}