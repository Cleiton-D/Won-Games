import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import CartDropdown from '.';

import mockItems from 'components/CartList/mock';

describe('<CartDropdown />', () => {
  it('should render <CartIcon /> and its badge', () => {
    renderWithTheme(<CartDropdown items={mockItems} total="R$ 300,00" />);

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockItems.length}`)).toBeInTheDocument();
  });

  it('should render Dropdown content with cart items and total', () => {
    renderWithTheme(<CartDropdown items={mockItems} total="R$ 300,00" />);

    expect(screen.getByText('R$ 300,00')).toBeInTheDocument();
    expect(screen.getByText(`${mockItems[0].title}`)).toBeInTheDocument();
  });
});
