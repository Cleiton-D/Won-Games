import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { StyledIconProps } from '@styled-icons/styled-icon';
import * as S from './styles';

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  minimal?: boolean;
  icon?: React.ComponentType<StyledIconProps>;
  as?: React.ElementType;
} & ButtonTypes;

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  size = 'medium',
  fullWidth = false,
  minimal = false,
  ...props
}) => (
  <S.Wrapper
    size={size}
    fullWidth={fullWidth}
    hasIcon={!!Icon}
    minimal={minimal}
    {...props}
  >
    {!!Icon && <Icon data-testid="icon" />}
    {!!children && <span>{children}</span>}
  </S.Wrapper>
);

export default Button;
