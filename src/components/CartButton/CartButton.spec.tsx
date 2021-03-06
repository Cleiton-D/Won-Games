import { render, screen } from 'utils/test-utils';

import { CartContextDefaultValues } from 'hooks/use-cart';
import CartButton from '.';
import userEvent from '@testing-library/user-event';

describe('<CartButton />', () => {
  it('should render button to add and call the method if clicked', () => {
    const addToCart = jest.fn();

    const cartProviderProps = {
      ...CartContextDefaultValues,
      isInCart: () => false,
      addToCart
    };

    render(<CartButton id="1" />, { cartProviderProps });

    const button = screen.getByLabelText(/add to cart/i);
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    expect(addToCart).toHaveBeenCalledWith('1');
  });

  it('should render button to remove and call the method if clicked', () => {
    const removeFromCart = jest.fn();

    const cartProviderProps = {
      ...CartContextDefaultValues,
      isInCart: () => true,
      removeFromCart
    };

    render(<CartButton id="1" />, { cartProviderProps });

    const button = screen.getByLabelText(/remove from cart/i);
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    expect(removeFromCart).toHaveBeenCalledWith('1');
  });
});
