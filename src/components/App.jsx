import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MapContainer from './MapContainer';
import VoterModal from './VoterModal.jsx';
import axios from 'axios';
import Header from './Header';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: true,
      firstName: null,
      lastName: null,
      voterInfo: {},
      layers: {
        councilDist: null,
        commissionerDist: null
      }
    };
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  componentWillMount() {
    this._getGISData(this.props.match);
  }

  _getCouncilDistricts = () => {
    return axios.get('http://data-greensboro.opendata.arcgis.com/datasets/829c58aaaf0c4bf0b59f93bfe3cb4c13_3.geojson');
  }

  _getCommissionerDistricts = () => {
    return axios.get('http://data-greensboro.opendata.arcgis.com/datasets/1b60f15bb4dc4d8f96bd4831a8fbf063_5.geojson');
  }

  _getGISData = () => {
    axios.all([this._getCouncilDistricts(), this._getCommissionerDistricts()])
    .then(axios.spread((councilDist, commissionerDist) => {
      console.log(councilDist.data, commissionerDist.data);
      this.setState({ layers: { councilDist: councilDist.data, commissionerDist: commissionerDist.data } });
    }));
  }

  _getVoterInfo = () => {
    axios.get(`/api/${this.state.firstName}/${this.state.lastName}`, { baseURL: 'http://localhost:3001/' })
    .then((response) => {
      this.setState({voterInfo: response});
      console.log(response);
      alert(JSON.stringify(this.state.voterInfo.data, null, 2));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  _handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const modalClose = () => this.setState({ modalShow: false });
    return (
      this.state.layers.councilDist && this.state.layers.commissionerDist ?
        <div className="map">
          <Header />
          <MapContainer data={this.state.layers} />
          <VoterModal show={this.state.modalShow} onHide={modalClose} onSubmit={this._getVoterInfo} onUpdate={this._handleInputChange}/>
        </div> : null
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
};
