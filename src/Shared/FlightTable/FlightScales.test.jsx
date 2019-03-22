import React from 'react';
import { render } from 'react-testing-library';
import { FlightScales } from './FlightScales';

describe('FlightScales', () => {
  it('should render - when length is <= 1', () => {
    const testFlights = [
      {
        voo: 'IIID',
        origem: 'BRA',
        destino: 'BRE',
        saida: '13:00',
        chegada: '20:00',
      },
    ];

    const { getByTestId } = render(<FlightScales scales={testFlights} />);

    const spanElement = getByTestId('empty-scales');

    expect(spanElement.textContent).toBe('-');
  });

  xit('should render scales when length is > 1', () => {
    const testFlights = [
      {
        voo: 'IIID',
        origem: 'BRA',
        destino: 'BRE',
        saida: '13:00',
        chegada: '20:00',
      },
      {
        voo: 'UUUD',
        origem: 'KR',
        destino: 'PRA',
        saida: '23:00',
        chegada: '23:30',
      },
    ];

    const { getByTestId } = render(<FlightScales scales={testFlights} />);

    const firstFlight = getByTestId('BRA-BRE-13:00-20:00');
    const secondFlight = getByTestId('KR-PRA-23:00-23:30');

    expect(firstFlight).toBeDefined();
    expect(secondFlight).toBeDefined();
  });
});
