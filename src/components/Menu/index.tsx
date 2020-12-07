import { useState, useCallback } from 'react';
import Link from 'next/link';

import { Menu2 as MenuIcon } from '@styled-icons/remix-fill/Menu2';
import { ShoppingCart as ShoppingCartIcon } from '@styled-icons/material-outlined/ShoppingCart';
import { Search as SearchIcon } from '@styled-icons/material-outlined/Search';
import { Close as CloseIcon } from '@styled-icons/material-outlined/Close';

import Logo from 'components/Logo';

import * as S from './styles';
import Button from 'components/Button';
import MediaMatch from 'components/MediaMatch';

export type MenuProps = {
  username?: string;
};

const Menu: React.FC<MenuProps> = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <S.Wrapper>
      <MediaMatch lessThan="medium">
        <S.IconWrapper onClick={handleOpenMenu}>
          <MenuIcon aria-label="Open Menu" />
        </S.IconWrapper>
      </MediaMatch>

      <S.LogoWrapper>
        <Logo hideOnMobile />
      </S.LogoWrapper>

      <MediaMatch greatherThan="medium">
        <S.MenuNav>
          <S.MenuLink href="#">Home</S.MenuLink>
          <S.MenuLink href="#">Explore</S.MenuLink>
        </S.MenuNav>
      </MediaMatch>

      <S.MenuGroup>
        <S.IconWrapper>
          <SearchIcon aria-label="Search" />
        </S.IconWrapper>
        <S.IconWrapper>
          <ShoppingCartIcon aria-label="Open Shopping Cart" />
        </S.IconWrapper>

        {!username && (
          <MediaMatch greatherThan="medium">
            <Link href="/sign-in" passHref>
              <Button as="a">Sign in</Button>
            </Link>
          </MediaMatch>
        )}
      </S.MenuGroup>

      <MediaMatch lessThan="medium">
        <S.MenuFull aria-hidden={!isOpen} isOpen={isOpen}>
          <CloseIcon aria-label="Close Menu" onClick={handleCloseMenu} />
          <S.MenuNav>
            <S.MenuLink href="#">Home</S.MenuLink>
            <S.MenuLink href="#">Explore</S.MenuLink>

            {!!username && (
              <>
                <S.MenuLink href="#">My account</S.MenuLink>
                <S.MenuLink href="#">Wishlist</S.MenuLink>
              </>
            )}
          </S.MenuNav>
          {!username && (
            <S.RegisterBox>
              <Link href="/sign-in" passHref>
                <Button fullWidth size="large" as="a">
                  Sign in now
                </Button>
              </Link>
              <span>or</span>
              <Link href="/sign-up" passHref>
                <S.CreateAccount title="Sign Up">Sign Up</S.CreateAccount>
              </Link>
            </S.RegisterBox>
          )}
        </S.MenuFull>
      </MediaMatch>
    </S.Wrapper>
  );
};

export default Menu;
