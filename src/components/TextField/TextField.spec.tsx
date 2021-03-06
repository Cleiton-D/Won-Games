import userEvent from '@testing-library/user-event';
import { Email } from '@styled-icons/material-outlined/Email';

import { render, screen, waitFor } from 'utils/test-utils';

import TextField from '.';

describe('<TextField />', () => {
  it('Renders with Label', () => {
    render(<TextField label="Label" name="Field" />);

    expect(screen.getByLabelText('Label')).toBeInTheDocument();
  });

  it('Renders without Label', () => {
    render(<TextField />);

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument();
  });

  it('Renders without placeholder', () => {
    render(<TextField placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText('Placeholder')).toBeInTheDocument();
  });

  it('Renders with Icon', () => {
    render(<TextField icon={Email} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('Renders with Icon on the right side', () => {
    render(<TextField icon={Email} iconPosition="right" />);

    expect(screen.getByTestId('icon').parentElement).toHaveStyle({ order: 1 });
  });

  it('Changes its value when typing', async () => {
    const onInput = jest.fn();
    render(
      <TextField label="Label" name="Field" id="Field" onInput={onInput} />
    );

    const input = screen.getByRole('textbox');
    const text = 'This is my new text';
    userEvent.type(input, text);

    await waitFor(() => {
      expect(input).toHaveValue(text);
      expect(onInput).toHaveBeenCalledTimes(text.length);
    });
    expect(onInput).toHaveBeenCalledWith(text);
  });

  it('Does not changes its value when disabled', async () => {
    const onInput = jest.fn();

    render(<TextField onInput={onInput} label="Label" name="Field" disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();

    const text = 'This is my new text';
    userEvent.type(input, text);

    await waitFor(() => {
      expect(input).not.toHaveValue(text);
    });
    expect(onInput).not.toHaveBeenCalled();
  });

  it('Renders with error', () => {
    render(<TextField error="Error Message" />);

    expect(screen.getByText('Error Message')).toBeInTheDocument();
  });

  it('its accessible by tab', () => {
    render(<TextField label="Label" name="Field" />);

    const input = screen.getByLabelText('Label');
    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(input).toHaveFocus();
  });

  it('its not accessible by tab when disabled', () => {
    render(<TextField label="Label" name="Field" disabled />);

    const input = screen.getByLabelText('Label');
    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(input).not.toHaveFocus();
  });
});
