import { useMemo } from 'react';
import Link from 'next/link';

import { FavoriteBorder } from '@styled-icons/material-outlined/FavoriteBorder';
import { Favorite } from '@styled-icons/material-outlined/Favorite';
import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart';

import Button from 'components/Button';
import Ribbon, { RibbonColors, RibbonSizes } from 'components/Ribbon';
import formatCurrency from 'utils/formatCurrency';

import * as S from './styles';

export type GameCardProps = {
  slug: string;
  title: string;
  developer: string;
  image: string;
  price: number;
  promotionalPrice?: number;
  favorite?: boolean;
  onFav?: () => void;
  ribbon?: React.ReactNode;
  ribbonColor?: RibbonColors;
  ribbonSize?: RibbonSizes;
};

const GameCard = ({
  slug,
  title,
  developer,
  image,
  price,
  promotionalPrice,
  favorite = false,
  ribbon,
  ribbonColor = 'primary',
  ribbonSize = 'small',
  onFav
}: GameCardProps) => {
  const formattedPrice = useMemo(() => formatCurrency(price), [price]);
  const formattedPromotionalPrice = useMemo(
    () => promotionalPrice && formatCurrency(promotionalPrice),
    [promotionalPrice]
  );

  return (
    <S.Wrapper>
      {!!ribbon && (
        <Ribbon color={ribbonColor} size={ribbonSize}>
          {ribbon}
        </Ribbon>
      )}
      <Link href={`game/${slug}`} passHref>
        <S.ImageBox>
          <img src={image} alt={title} />
        </S.ImageBox>
      </Link>
      <S.Content>
        <Link href={`game/${slug}`} passHref>
          <S.Info>
            <S.Title>{title}</S.Title>
            <S.Developer>{developer}</S.Developer>
          </S.Info>
        </Link>
        <S.FavButton onClick={onFav} role="button">
          {favorite ? (
            <Favorite aria-label="remove from Wishlist" />
          ) : (
            <FavoriteBorder aria-label="Add to Wishlist" />
          )}
        </S.FavButton>
        <S.BuyBox>
          {!!promotionalPrice && (
            <S.Price isPromotional>{formattedPrice}</S.Price>
          )}
          <S.Price>{formattedPromotionalPrice || formattedPrice}</S.Price>
          <Button icon={AddShoppingCart} size="small" />
        </S.BuyBox>
      </S.Content>
    </S.Wrapper>
  );
};

export default GameCard;
