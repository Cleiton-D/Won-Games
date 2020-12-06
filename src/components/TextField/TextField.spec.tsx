import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Email } from '@styled-icons/material-outlined/Email';

import { renderWithTheme } from 'utils/tests/helpers';

import TextField from '.';

describe('<TextField />', () => {
  it('Renders with Label', () => {
    renderWithTheme(<TextField label="Label" labelFor="Field" id="Field" />);

    expect(screen.getByLabelText('Label')).toBeInTheDocument();
  });

  it('Renders without Label', () => {
    renderWithTheme(<TextField />);

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument();
  });

  it('Renders without placeholder', () => {
    renderWithTheme(<TextField placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText('Placeholder')).toBeInTheDocument();
  });

  it('Renders with Icon', () => {
    renderWithTheme(<TextField icon={Email} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('Renders with Icon on the right side', () => {
    renderWithTheme(<TextField icon={Email} iconPosition="right" />);

    expect(screen.getByTestId('icon').parentElement).toHaveStyle({ order: 1 });
  });

  it('Changes its value when typing', async () => {
    const onInput = jest.fn();
    renderWithTheme(
      <TextField label="Label" labelFor="Field" id="Field" onInput={onInput} />
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

    renderWithTheme(
      <TextField
        onInput={onInput}
        label="Label"
        labelFor="Field"
        id="Field"
        disabled
      />
    );

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
    renderWithTheme(<TextField error="Error Message" />);

    expect(screen.getByText('Error Message')).toBeInTheDocument();
  });

  it('its accessible by tab', () => {
    renderWithTheme(<TextField label="Label" labelFor="Field" id="Field" />);

    const input = screen.getByLabelText('Label');
    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(input).toHaveFocus();
  });

  it('its not accessible by tab when disabled', () => {
    renderWithTheme(
      <TextField label="Label" labelFor="Field" id="Field" disabled />
    );

    const input = screen.getByLabelText('Label');
    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(input).not.toHaveFocus();
  });
});
