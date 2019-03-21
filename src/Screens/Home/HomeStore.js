import Reflux from 'reflux';
import axios from 'axios';
import moment from 'moment';
import { HomeActions } from './HomeActions';

export class HomeStore extends Reflux.Store {
  constructor() {
    super();

    this.listenables = HomeActions;

    this.state = {
      isLoading: false,
      flightCompanies: [],
      data: [],
    };
  }

  onGetFlightCompanies() {
    this.setState({ isLoading: true });

    axios.get('https://api-voadora.dev.tegra.com.br/flight/companies').then(({ data }) => {
      this.setState({
        isLoading: false,
        flightCompanies: data,
      });
    });
  }

  onGetFlights({ origin, destiny, date }) {
    this.setState({ isLoading: true });

    axios
      .post('https://api-voadora.dev.tegra.com.br/flight', {
        from: origin,
        to: destiny,
        date: date.format('YYYY-MM-DD'),
      })
      .then(({ data }) => {
        this.setState({
          isLoading: false,
          data: this.formatFlights(data),
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          data: [],
        });
      });
  }

  // eslint-disable-next-line class-methods-use-this
  formatFlights(data) {
    return data.reduce((acc, flight) => {
      const origin = flight.voos[0].origem;
      const destiny = flight.voos[flight.voos.length - 1].destino;
      const date = flight.voos[0].data_saida;
      const departureTime = flight.voos[0].saida;
      const arrivalTime = flight.voos[flight.voos.length - 1].chegada;
      const scales = flight.voos;
      const value = flight.voos.reduce((f, { valor }) => f + valor, 0);
      const duration = moment(arrivalTime, 'HH:mm')
        .subtract(departureTime.split(':')[0], 'hours')
        .subtract(departureTime.split(':')[1], 'minutes')
        .format('HH:mm');
      acc.push({
        origin,
        destiny,
        date,

        departureTime,
        arrivalTime,

        duration,
        scales,
        value,
      });

      return acc;
    }, []);
  }
}
