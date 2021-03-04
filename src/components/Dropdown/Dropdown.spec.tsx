import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from 'utils/tests/helpers';

import Dropdown from '.';

describe('<Dropdown />', () => {
  beforeEach(() => {
    const title = <h1 aria-label="toogle dropdown">Click here</h1>;

    renderWithTheme(
      <Dropdown title={title}>
        <span>content</span>
      </Dropdown>
    );
  });

  it('should render title', () => {
    expect(screen.getByLabelText(/toogle dropdown/)).toBeInTheDocument();
  });

  it('should handle open/close dropdown', () => {
    const content = screen.getByText(/content/).parentElement;

    expect(content).toHaveStyle({ opacity: 0 });
    expect(content).toHaveAttribute('aria-hidden', 'true');

    userEvent.click(screen.getByLabelText(/toogle dropdown/i));

    expect(content).toHaveStyle({ opacity: 1 });
    expect(content).toHaveAttribute('aria-hidden', 'false');
  });

  it('should handle open/close dropdown when clicking on overlay', () => {
    const content = screen.getByText(/content/).parentElement;
    const overlay = content?.nextElementSibling;

    userEvent.click(screen.getByLabelText(/toogle dropdown/i));

    expect(overlay).toHaveStyle({ opacity: 1 });
    expect(overlay).toHaveAttribute('aria-hidden', 'false');

    userEvent.click(overlay!);

    expect(overlay).toHaveStyle({ opacity: 0 });
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });
});
