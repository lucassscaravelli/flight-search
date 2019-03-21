import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { Home } from './Home';

afterEach(cleanup);

it('should render a div with label "Hello Home" ', () => {
  const { getByText } = render(<Home />);

  const expectedEl = getByText('Hello Home');
  expect(expectedEl.nodeName).toBe('DIV');
});
