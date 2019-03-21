import React from 'react';
import { render } from 'react-testing-library';
import { SharedHeader } from './Header';

describe('Header', () => {
  it('should render h1 title', () => {
    const { getByTestId } = render(<SharedHeader />);

    const h1Element = getByTestId('title-logo-h1');
    const spanElement = getByTestId('title-logo-span');

    expect(h1Element).toBeDefined();
    expect(spanElement.textContent).toBe('Flight Search');
  });
});
