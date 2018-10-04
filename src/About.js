import React, {Component} from 'react';
import Menu from "./Menu";

export default class About extends Component {
    componentDidMount() {
        const { match, location, history } = this.props;
        console.log("match", match);
        console.log("location", location);
        console.log("history", history);
    }
    render() {
        return (
            <div>
                <Menu/>
                <h1>The most coolest about in the f***ing world</h1>
            </div>
        );
    };
}


