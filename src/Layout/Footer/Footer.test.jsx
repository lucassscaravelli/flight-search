import React from 'react';
import { render } from 'react-testing-library';
import { SharedFooter } from './Footer';

describe('Header', () => {
  it('should render h1 title', () => {
    const { getByTestId } = render(<SharedFooter />);

    const pElement = getByTestId('footer-p');

    expect(pElement.textContent).toBe('Criado por lucassscaravelli');
  });
});
