import * as S from './styles';

export type HeadingProps = {
  children: React.ReactNode;
  color?: 'white' | 'black';
  lineLeft?: boolean;
  lineBottom?: boolean;
};

const Heading: React.FC<HeadingProps> = ({
  children,
  color = 'white',
  lineLeft = false,
  lineBottom = false
}) => (
  <S.Wrapper color={color} lineLeft={lineLeft} lineBottom={lineBottom}>
    {children}
  </S.Wrapper>
);

export default Heading;
