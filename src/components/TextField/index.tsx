import { useState, useCallback, InputHTMLAttributes } from 'react';
import { StyledIconProps } from '@styled-icons/styled-icon';

import * as S from './styles';

export type TextFieldProps = {
  onInput?: (value: string) => void;
  label?: string;
  initialValue?: string;
  icon?: React.ComponentType<StyledIconProps>;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({
  label,
  name,
  initialValue = '',
  error,
  iconPosition = 'left',
  disabled = false,
  icon: Icon,
  onInput,
  ...rest
}: TextFieldProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValue(newValue);

      !!onInput && onInput(newValue);
    },
    [onInput]
  );

  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        {!!Icon && (
          <S.Icon iconPosition={iconPosition}>
            <Icon data-testid="icon" size={22} />
          </S.Icon>
        )}
        <S.Input
          type="text"
          onChange={onChange}
          value={value}
          iconPosition={iconPosition}
          disabled={disabled}
          name={name}
          {...(label ? { id: name } : {})}
          {...rest}
        />
      </S.InputWrapper>
      {!!error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
};

export default TextField;
