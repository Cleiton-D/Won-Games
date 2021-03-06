import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'utils/test-utils';

import Checkbox from '.';

describe('<Checkbox />', () => {
  it('should render with label', () => {
    render(<Checkbox label="checkbox label" labelFor="check" />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByLabelText(/checkbox label/i)).toBeInTheDocument();
    expect(screen.getByText(/checkbox label/i)).toHaveAttribute('for', 'check');
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'check');
  });

  it('should render without label', () => {
    render(<Checkbox />);

    expect(screen.queryByLabelText('Checkbox')).not.toBeInTheDocument();
  });

  it('should render with black label', () => {
    render(
      <Checkbox label="Checkbox label" labelFor="check" labelColor="black" />
    );

    expect(screen.getByText(/checkbox label/i)).toHaveStyle({
      color: '#030517'
    });
  });

  it('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn();

    render(
      <Checkbox label="Checkbox label" labelFor="check" onCheck={onCheck} />
    );

    expect(onCheck).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('checkbox'));
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1);
    });
    expect(onCheck).toHaveBeenCalledWith(true);
  });

  it('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn();

    render(
      <Checkbox
        label="Checkbox label"
        labelFor="check"
        onCheck={onCheck}
        isChecked
      />
    );

    userEvent.click(screen.getByRole('checkbox'));
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1);
    });
    expect(onCheck).toHaveBeenCalledWith(false);
  });

  it('should be accessible with tab', async () => {
    render(<Checkbox label="Checkbox label" labelFor="check" />);

    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(screen.getByLabelText(/checkbox label/i)).toHaveFocus();
  });
});
