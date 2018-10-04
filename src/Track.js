import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as Actions from "./actions/tracks";
import * as axios from "axios";
import Menu from "./Menu";
import {Col, Row, Container} from 'reactstrap';
import {JSW_Details} from "./JSW_Api";


let reciveData;
let myId = null;

class Track extends Component {
    constructor(props, context) {
        super(props, context);
        console.log("props:", props);
        console.log("context:", context);
        this.state = {
            reciveData: []
        }
    }

    componentDidMount() {
        console.log("this.props.match.params.id", this.props.match.params.id);
        axios({
            url: JSW_Details + this.props.match.params.id,
            timeout: 20000,
            method: "get",
            responseType: "json"
        })
            .then((response) => {
                reciveData = response.data;
                this.setState({
                    reciveData: reciveData
                });
            });
    }

    render() {
        const {reciveData} = this.state;
        return (
            <Container>
                <div>
                    {reciveData && reciveData.length > 0 && (
                        <Container>
                            <Row>
                                <Col md={{size:2}}/>
                                <Col md={{size:4}}>
                                    <Menu/>
                                </Col>
                                <Col md={{size:1}}/>
                            </Row>
                            <Row>
                                <Col md={{size:2}}/>
                                <Col md={{size:4}}>
                                    <h3> Tracks in album:</h3>
                                    {titles(this.props.match.params.id).split("\n").map((i,index) => {
                                        return <div key={index}><b>{i}</b></div>;
                                    })}
                                    <h3> Album:</h3>
                                    <p>{reciveData[0].album}</p>
                                    <h3> Author:</h3>
                                    {myId && (
                                        <p>{myId}</p>
                                    )}
                                    {!myId && (
                                        <p>{reciveData[0].author}</p>
                                    )}
                                </Col>
                                <Col md={{size:1}}>
                                    <img width={350} src={reciveData[0].cover}/>
                                </Col>
                            </Row>
                        </Container>
                    )}
                </div>
            </Container>
        );
    }
}

function titles(id) {
    let arr = "";
    for (var i = 0; i < reciveData.length; i++) {
        let y = reciveData[i].album;
        if (y === "no info") {
            if (reciveData[i].title === id) {
                arr = reciveData[i].title;
                myId = reciveData[i].author;
                break;
            }
        }
        else {
            arr += i+1+" "+ reciveData[i].title + `\n`;
        }
    }

    return arr;
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps.match.params.id);
    return {
        track: state.tracks.find(track => track.id === Number(ownProps.match.params.id))
    }
};

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps()) (Track);