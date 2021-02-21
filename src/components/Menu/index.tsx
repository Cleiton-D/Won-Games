import { useState, useCallback } from 'react';
import Link from 'next/link';

import { Menu2 as MenuIcon } from '@styled-icons/remix-fill/Menu2';
import { Search as SearchIcon } from '@styled-icons/material-outlined/Search';
import { Close as CloseIcon } from '@styled-icons/material-outlined/Close';

import Logo from 'components/Logo';
import Button from 'components/Button';
import MediaMatch from 'components/MediaMatch';
import CartDropdown from 'components/CartDropdown';

import * as S from './styles';
import CartIcon from 'components/CartIcon';
import UserDropdown from 'components/UserDropdown';

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
        <Link href="/" passHref>
          <a>
            <Logo hideOnMobile />
          </a>
        </Link>
      </S.LogoWrapper>

      <MediaMatch greatherThan="medium">
        <S.MenuNav>
          <Link href="/" passHref>
            <S.MenuLink>Home</S.MenuLink>
          </Link>
          <Link href="/games" passHref>
            <S.MenuLink>Explore</S.MenuLink>
          </Link>
        </S.MenuNav>
      </MediaMatch>

      <S.MenuGroup>
        <S.IconWrapper>
          <SearchIcon aria-label="Search" />
        </S.IconWrapper>
        <S.IconWrapper>
          <MediaMatch greatherThan="medium">
            <CartDropdown />
          </MediaMatch>
          <MediaMatch lessThan="medium">
            <Link href="/cart" passHref>
              <a>
                <CartIcon />
              </a>
            </Link>
          </MediaMatch>
        </S.IconWrapper>

        <MediaMatch greatherThan="medium">
          {username ? (
            <UserDropdown username={username} />
          ) : (
            <Link href="/sign-in" passHref>
              <Button as="a">Sign in</Button>
            </Link>
          )}
        </MediaMatch>
      </S.MenuGroup>

      <MediaMatch lessThan="medium">
        <S.MenuFull aria-hidden={!isOpen} isOpen={isOpen}>
          <CloseIcon aria-label="Close Menu" onClick={handleCloseMenu} />
          <S.MenuNav>
            <Link href="/" passHref>
              <S.MenuLink>Home</S.MenuLink>
            </Link>
            <Link href="/games" passHref>
              <S.MenuLink>Explore</S.MenuLink>
            </Link>

            {!!username && (
              <>
                <Link href="/profile/me" passHref>
                  <S.MenuLink>My profile</S.MenuLink>
                </Link>
                <Link href="/wishlist" passHref>
                  <S.MenuLink>Wishlist</S.MenuLink>
                </Link>
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
