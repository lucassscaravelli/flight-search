import React from 'react';
import { render } from 'react-testing-library';
import { withRoutes } from './Routes';

describe('Routes', () => {
  const WrappedTest = () => <p data-testid="wrapped-id">hello wrapped</p>;

  it('should render routes inside wrapped', () => {
    const { getByTestId } = render(withRoutes(WrappedTest));

    const wrappedElement = getByTestId('wrapped-id');

    expect(wrappedElement.textContent).toBe('hello wrapped');
  });
});
