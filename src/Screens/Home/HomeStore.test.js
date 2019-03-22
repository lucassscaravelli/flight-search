import moment from 'moment';
import { HomeStore } from './HomeStore';
import { mockAxiosAndGenerateSpies } from '../../Test/axiosMock';

describe('HomeStore', () => {
  let store;

  beforeEach(() => {
    store = new HomeStore();
  });

  it('should set flightCompanies', () => {
    const fakeData = [{ cidade: 'itu' }];

    const { callThen, spyOnGet } = mockAxiosAndGenerateSpies();

    expect(store.state.isLoading).toBeFalsy();
    store.onGetFlightCompanies();

    expect(spyOnGet).toHaveBeenCalledWith('https://api-voadora.dev.tegra.com.br/flight/companies');
    expect(store.state.isLoading).toBeTruthy();

    callThen({ data: fakeData });
    expect(store.state.isLoading).toBeFalsy();
    expect(store.state.flightCompanies).toEqual(fakeData);
  });

  it('should set data', () => {
    const fakeData = {
      origin: 'brasil',
      destiny: 'argentina',
      date: moment('02/10/2019', 'DD/MM/YYYY'),
    };

    const fakeResult = [
      {
        voos: [
          {
            origem: 'BRA',
            destino: 'PRA',

            data_saida: '2019-02-10',

            saida: '08:30',
            chegada: '15:10',

            valor: 400,
          },
          {
            origem: 'PRA',
            destino: 'TRA',

            data_saida: '2019-02-10',

            saida: '16:30',
            chegada: '20:10',

            valor: 900,
          },
        ],
      },
    ];

    const { callThen, spyOnPost } = mockAxiosAndGenerateSpies();

    expect(store.state.isLoading).toBeFalsy();
    store.onGetFlights(fakeData);

    expect(spyOnPost).toHaveBeenCalledWith('https://api-voadora.dev.tegra.com.br/flight', {
      from: fakeData.origin,
      to: fakeData.destiny,
      date: '2019-10-02',
    });
    expect(store.state.isLoading).toBeTruthy();

    callThen({ data: fakeResult });
    expect(store.state.isLoading).toBeFalsy();
    expect(store.state.data).toEqual([
      {
        origin: 'BRA',
        destiny: 'TRA',
        date: '2019-02-10',

        departureTime: '08:30',
        arrivalTime: '20:10',

        duration: '11:40',
        scales: [
          {
            origem: 'BRA',
            destino: 'PRA',

            data_saida: '2019-02-10',

            saida: '08:30',
            chegada: '15:10',

            valor: 400,
          },
          {
            origem: 'PRA',
            destino: 'TRA',

            data_saida: '2019-02-10',

            saida: '16:30',
            chegada: '20:10',

            valor: 900,
          },
        ],
        value: 1300,
      },
    ]);
  });
});
