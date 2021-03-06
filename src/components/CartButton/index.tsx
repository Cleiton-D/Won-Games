import { useCallback, useMemo } from 'react';
import {
  AddShoppingCart,
  RemoveShoppingCart
} from '@styled-icons/material-outlined';

import Button, { ButtonProps } from 'components/Button';
import { useCart } from 'hooks/use-cart';

export type CartButtonProps = {
  id: string;
  hasText?: boolean;
} & Pick<ButtonProps, 'size'>;

const CartButton = ({
  id,
  size = 'small',
  hasText = false
}: CartButtonProps) => {
  const { isInCart, addToCart, removeFromCart } = useCart();

  const inCart = useMemo(() => isInCart(id), [id, isInCart]);

  const handleClick = useCallback(() => {
    if (inCart) {
      removeFromCart(id);
      return;
    }

    addToCart(id);
  }, [removeFromCart, addToCart, inCart, id]);

  return (
    <Button
      icon={inCart ? RemoveShoppingCart : AddShoppingCart}
      aria-label={inCart ? 'Remove from cart' : 'Add to cart'}
      size={size}
      onClick={handleClick}
    >
      {hasText && (inCart ? 'Remove from cart' : 'Add to cart')}
    </Button>
  );
};

export default CartButton;
