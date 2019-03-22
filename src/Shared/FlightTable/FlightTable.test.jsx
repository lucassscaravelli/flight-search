import React from 'react';
import { render } from 'react-testing-library';
import { FlightTable } from './FlightTable';

describe('FlightTable', () => {
  it('should render FlightTable', () => {
    const dataMock = [
      {
        value: 3000,
        origin: 'rj',
        destiny: 'sp',
        departureTime: '08:00',
        arrivalTime: '12:00',
        duration: '09:00',
      },
    ];

    const { getByTestId } = render(
      <FlightTable data={dataMock} isLoading={false} searchCallback={() => {}} />,
    );

    const spanValue = getByTestId('value-3000');

    expect(spanValue.textContent).toBe('R$ 3000,00');
  });
});
