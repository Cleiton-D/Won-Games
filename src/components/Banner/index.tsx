import * as S from './styles';
import Button from 'components/Button';

export type BannerProps = {
  image: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonLink: string;
};

const Banner: React.FC<BannerProps> = ({
  image,
  title,
  subtitle,
  buttonLabel,
  buttonLink
}) => (
  <S.Wrapper>
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
