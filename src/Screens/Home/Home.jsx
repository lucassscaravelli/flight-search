import React from 'react';
import Reflux from 'reflux';
import { HomeStore } from './HomeStore';
import { HomeActions } from './HomeActions';
import { FlightTable } from '../../Shared';

export class Home extends Reflux.Component {
  constructor(props) {
    super(props);

    this.store = HomeStore;
  }

  componentDidMount() {
    HomeActions.GetFlightCompanies();
  }

  render() {
    const { isLoading, data, flightCompanies } = this.state;

    return (
      <div className="home-container">
        <FlightTable
          data={data}
          flightCompanies={flightCompanies}
          isLoading={isLoading}
          searchCallback={HomeActions.GetFlights}
        />
      </div>
    );
  }
}
