import React from 'react';
import { render } from 'react-testing-library';
import { SharedLayout } from './Layout';

describe('Layout', () => {
  const ChildrenTest = () => <p data-testid="children-id">Hello test</p>;

  it('should render children', () => {
    const { getAllByTestId } = render(
      <SharedLayout>
        <ChildrenTest />
      </SharedLayout>,
    );

    const results = getAllByTestId('children-id');

    expect(results.length).toBe(1);
    expect(results[0].textContent).toBe('Hello test');
  });
});
