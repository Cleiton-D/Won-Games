import { ShoppingCart } from '@styled-icons/material-outlined/ShoppingCart';

import * as S from './styles';

export type CartItemProps = {
  quantity?: number;
};

const CartIcon = ({ quantity = 0 }: CartItemProps) => (
  <S.Wrapper>
    {quantity > 0 && <S.Badge aria-label="Cart Items">{quantity}</S.Badge>}
    <ShoppingCart aria-label="Shopping cart" />
  </S.Wrapper>
);

export default CartIcon;
