import styled, { css } from 'styled-components';
import { tint } from 'polished';

import * as ButtonStyles from 'components/Button/styles';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
  `}
`;

export const Body = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    background: ${tint(0.2, theme.colors.lightGray)};
    color: ${theme.colors.black};
    font-weight: ${theme.font.bold};
    padding: ${theme.spacings.small};
    display: flex;
    align-items: center;

    ${ButtonStyles.Wrapper} {
      padding-left: ${theme.spacings.xxsmall};
      padding-right: ${theme.spacings.xxsmall};
      outline: 0;
    }
  `}
`;

export const CardsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommonCardItem = styled.label`
  ${({ theme }) => css`
    background: ${theme.colors.lightGray};
    border-radius: 0.2rem;
    color: ${theme.colors.black};
    padding: 0 ${theme.spacings.xxsmall};
    height: 5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  `}
`;

export const CardItem = styled(CommonCardItem)`
  ${({ theme }) => css`
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: ${theme.spacings.xxsmall};
    }
  `}
`;

export const CardInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    img {
      margin-right: ${theme.spacings.xxsmall};
    }
  `}
`;

export const AddCard = styled(CommonCardItem).attrs({ as: 'div' })`
  ${({ theme }) => css`
    svg {
      margin-left: ${theme.spacings.xxsmall};
      margin-right: ${theme.spacings.xsmall};
      width: 2.4rem;
    }
  `}
`;
