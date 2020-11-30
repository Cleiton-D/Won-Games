import { useCallback, InputHTMLAttributes } from 'react';

import * as S from './styles';

type RadioValue = string | ReadonlyArray<string> | number;

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  onCheck?: (value?: RadioValue) => void;
  label?: string;
  labelColor?: 'white' | 'black';
  labelFor?: string;
  value?: RadioValue;
};

const Radio = ({
  onCheck,
  label,
  labelColor = 'white',
  labelFor,
  value,
  ...props
}: RadioProps) => {
  const onChange = useCallback(() => {
    !!onCheck && onCheck(value);
  }, [onCheck, value]);

  return (
    <S.Wrapper>
      <S.Input
        id={labelFor}
        type="radio"
        value={value}
        onChange={onChange}
        {...props}
      />
      {!!label && (
        <S.Label labelColor={labelColor} htmlFor={labelFor}>
          {label}
        </S.Label>
      )}
    </S.Wrapper>
  );
};

export default Radio;
