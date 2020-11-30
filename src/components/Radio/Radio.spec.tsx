import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from 'utils/tests/helpers';

import Radio from '.';

describe('<Radio />', () => {
  it('should render with label (white)', () => {
    const { container } = renderWithTheme(
      <Radio label="Radio" labelFor="radio" value="anyValue" />
    );

    const label = screen.getByText('Radio');
    expect(label).toBeInTheDocument();
    expect(label).toHaveStyle({ color: '#FAFAFA' });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with label (black)', () => {
    renderWithTheme(<Radio label="Radio" labelColor="black" />);

    const label = screen.getByText('Radio');
    expect(label).toBeInTheDocument();
    expect(label).toHaveStyle({ color: '#030517' });
  });

  it('should render withou label', () => {
    renderWithTheme(<Radio />);
    expect(screen.queryByLabelText('Radio')).not.toBeInTheDocument();
  });

  it('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn();
    renderWithTheme(
      <Radio
        label="Radio"
        labelFor="radio"
        onCheck={onCheck}
        value="anyValue"
      />
    );

    expect(onCheck).not.toHaveBeenCalled();

    userEvent.click(screen.getByLabelText('Radio'));
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1);
    });
    expect(onCheck).toHaveBeenCalledWith('anyValue');
  });

  it('should be accessible with tab', () => {
    renderWithTheme(<Radio label="Radio" labelFor="radio" />);

    const radio = screen.getByLabelText('Radio');

    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(radio).toHaveFocus();
  });
});
