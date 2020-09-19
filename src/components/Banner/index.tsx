import * as S from './styles';
import Button from 'components/Button';
import Ribbon, { RibbonColors, RibbonSizes } from 'components/Ribbon';

export type BannerProps = {
  image: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonLink: string;
  ribbon?: React.ReactNode;
  ribbonSize?: RibbonSizes;
  ribbonColor?: RibbonColors;
};

const Banner: React.FC<BannerProps> = ({
  image,
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  ribbon,
  ribbonColor,
  ribbonSize
}) => (
  <S.Wrapper>
    {!!ribbon && (
      <Ribbon color={ribbonColor} size={ribbonSize}>
        {ribbon}
      </Ribbon>
    )}

    <S.Image src={image} role="img" aria-label={title} />

    <S.Caption>
      <S.Title>{title}</S.Title>
      <S.Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />
      <Button as="a" href={buttonLink} size="large">
        {buttonLabel}
      </Button>
    </S.Caption>
  </S.Wrapper>
);

export default Banner;
