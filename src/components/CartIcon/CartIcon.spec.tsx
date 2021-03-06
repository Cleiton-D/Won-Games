import { render, screen } from 'utils/test-utils';

import CartIcon from '.';

describe('<CartIcon />', () => {
  it('should render without badge', () => {
    render(<CartIcon />);

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument();
  });

  it('should render with badge', () => {
    render(<CartIcon quantity={5} />);

    expect(screen.getByLabelText(/cart items/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render with badge only if has positive number', () => {
    render(<CartIcon quantity={-5} />);

    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument();
  });
});
