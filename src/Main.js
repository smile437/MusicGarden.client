import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as Actions from "./actions";
import PropTypes from 'prop-types';
import './App.css';
import Menu from "./Menu";
import {withRouter} from 'react-router-dom';
import {
    Button,
    Input,
    InputGroup,
    InputGroupButton,
    Col,
    Row,
    Container,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.onGetTracks = this.onGetTracks.bind(this);
        this.onFindTrack = this.onFindTrack.bind(this);
    }

    async componentDidMount() {
        const {match, location, history} = this.props;
        console.log("match", match);
        console.log("location", location);
        console.log("history", history);
        console.log("params", match.params);
        if (match.params && match.params.title) {
            this.searchInput.value = match.params.title;
        }
        else {
            this.searchInput.value = "";
        }
        await this.onFindTrack();
    }

    async onFindTrack() {

        if (this.searchInput.value && this.searchInput.value.length > 0) {
            this.props.setLoaderState(true);
            this.props.findTrackExtend(this.searchInput.value.trim());
            this.onGetTracks();
            this.props.findTrack(this.searchInput.value.trim());
            this.props.history.push(`/Main/Search/${this.searchInput.value.trim()}`);
        }
        else {
            this.props.history.push(`/Main`);
        }
        setTimeout(() => this.props.setLoaderState(false), 15000);
    }

    onGetTracks() {
        this.props.getTracksAsync();
    }

    render() {
        return (
            <Container>
                {this.props.appState.isLoading && (
                    <div className="loader"/>
                )}
                <div>
                    <Row>
                        <Col md={{size: 3}}/>
                        <Col md={{size: 6}}>
                            <Menu/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{size: 3}}/>
                        <Col md={{size: 6}}>
                            <InputGroup size="lg">
                                <Input placeholder="search" type="text" getRef={(Input) => {
                                    this.searchInput = Input
                                }}/>
                                <InputGroupButton><Button color="success" onClick={this.onFindTrack}><img
                                    src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ1MSA0NTEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1MSA0NTE7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8cGF0aCBkPSJNNDQ3LjA1LDQyOGwtMTA5LjYtMTA5LjZjMjkuNC0zMy44LDQ3LjItNzcuOSw0Ny4yLTEyNi4xQzM4NC42NSw4Ni4yLDI5OC4zNSwwLDE5Mi4zNSwwQzg2LjI1LDAsMC4wNSw4Ni4zLDAuMDUsMTkyLjMgICBzODYuMywxOTIuMywxOTIuMywxOTIuM2M0OC4yLDAsOTIuMy0xNy44LDEyNi4xLTQ3LjJMNDI4LjA1LDQ0N2MyLjYsMi42LDYuMSw0LDkuNSw0czYuOS0xLjMsOS41LTQgICBDNDUyLjI1LDQ0MS44LDQ1Mi4yNSw0MzMuMiw0NDcuMDUsNDI4eiBNMjYuOTUsMTkyLjNjMC05MS4yLDc0LjItMTY1LjMsMTY1LjMtMTY1LjNjOTEuMiwwLDE2NS4zLDc0LjIsMTY1LjMsMTY1LjMgICBzLTc0LjEsMTY1LjQtMTY1LjMsMTY1LjRDMTAxLjE1LDM1Ny43LDI2Ljk1LDI4My41LDI2Ljk1LDE5Mi4zeiIgZmlsbD0iIzkxREM1QSIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="/></Button></InputGroupButton>
                            </InputGroup>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col md={{size: 3, push: 2, pull: 2,}}>
                            <p/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{size: 3}}/>
                        <Col md={{size: 6}}>
                            {!this.props.appState.isLoading && (
                                <ListGroup>
                                    {this.props.tracks.map((track, index) =>
                                        <ListGroupItem key={index} tag="a"
                                                       href={`/Main/track/${track.title}`}>{track.title}</ListGroupItem>)}
                                </ListGroup>
                            )}
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.tracks,
        appState: state.appState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(Actions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

Main.propTypes = {
    findTrackExtend: PropTypes.func,
    getTracksAsync: PropTypes.func,
    findTrack: PropTypes.func,
};

