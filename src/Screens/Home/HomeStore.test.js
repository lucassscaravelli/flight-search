import { HomeStore } from './HomeStore';
import { mockAxiosAndGenerateSpies } from '../../Test/axiosMock';

describe('HomeStore', () => {
  let store;

  beforeEach(() => {
    store = new HomeStore();
  });

  it('should set companies data', () => {
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
});
