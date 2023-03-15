import { render, screen } from '@testing-library/react';

import ConditionalWrapper from './index';

describe('ConditionalWrapper', () => {
  test('only add the wrapper when the condition is true', async () => {
    render(
      <ConditionalWrapper
        condition={true}
        wrapper={(children) => <div data-testid="wrapper-div">{children}</div>}
      >
        <span>Display This</span>
      </ConditionalWrapper>,
    );

    const wrapper = await screen.findByTestId('wrapper-div');
    expect(wrapper).toBeTruthy();
    const child = await screen.findByText('Display This');
    expect(child).toBeTruthy();
  });

  test('only add the children element(s) when the condition is false', async () => {
    render(
      <ConditionalWrapper
        condition={false}
        wrapper={(children) => <div data-testid="wrapper-div">{children}</div>}
      >
        <span>Display This</span>
      </ConditionalWrapper>,
    );

    const wraperElement = await screen.queryByTestId('wrapper-div');
    expect(wraperElement).toBeNull();
    const child = await screen.findByText('Display This');
    expect(child).toBeTruthy();
  });
});
