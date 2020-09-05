import { StyledIconProps } from '@styled-icons/styled-icon';
import * as S from './styles';

export type ButtonProps = {
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  icon?: React.ComponentType<StyledIconProps>;
  onClick?: () => (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  size = 'medium',
  fullWidth = false,
  ...props
}) => (
  <S.Wrapper size={size} fullWidth={fullWidth} hasIcon={!!Icon} {...props}>
    {!!Icon && <Icon data-testid="icon" />}
    {!!children && <span>{children}</span>}
  </S.Wrapper>
);

export default Button;
