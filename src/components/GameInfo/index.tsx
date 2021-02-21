import { useMemo } from 'react';
import {
  AddShoppingCart,
  FavoriteBorder
} from '@styled-icons/material-outlined';

import Button from 'components/Button';
import Heading from 'components/Heading';
import Ribbon from 'components/Ribbon';
import formatCurrency from 'utils/formatCurrency';

import * as S from './styles';

export type GameInfoProps = {
  title: string;
  description: string;
  price: number;
};

const GameInfo = ({ title, description, price }: GameInfoProps) => {
  const formattedPrice = useMemo(() => formatCurrency(price), [price]);

  return (
    <S.Wrapper>
      <Heading color="black" lineBottom>
        {title}
      </Heading>

      <Ribbon color="secondary">{formattedPrice}</Ribbon>

      <S.Description>{description}</S.Description>

      <S.ButtonsWrapper>
        <Button icon={AddShoppingCart}>Add to cart</Button>
        <Button icon={FavoriteBorder} minimal>
          Wishlist
        </Button>
      </S.ButtonsWrapper>
    </S.Wrapper>
  );
};

export default GameInfo;
