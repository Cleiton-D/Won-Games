import { BannerProps } from 'components/Banner';
import { GameCardProps } from 'components/GameCard';
import { HighlightProps } from 'components/Highlight';

import Container from 'components/Container';
import BannerSlider from 'components/BannerSlider';
import Showcase from 'components/Showcase';

import * as S from './styles';
import Base from 'templates/Base';

export type HomeTemplateProps = {
  banners: BannerProps[];
  newGames: GameCardProps[];
  newGamesTitle: string;
  mostPopularHighlight: HighlightProps;
  mostPopularGamesTitle: string;
  mostPopularGames: GameCardProps[];
  upcomingGames: GameCardProps[];
  upcomingGamesTitle: string;
  upcomingHighlight: HighlightProps;
  freeGames: GameCardProps[];
  freeHighlight: HighlightProps;
  freeGamesTitle: string;
};

const Home = ({
  banners,
  newGames,
  newGamesTitle,
  mostPopularHighlight,
  mostPopularGamesTitle,
  mostPopularGames,
  upcomingGames,
  upcomingGamesTitle,
  upcomingHighlight,
  freeGames,
  freeHighlight,
  freeGamesTitle
}: HomeTemplateProps) => (
  <Base>
    <Container>
      <S.SectionBanner>
        <BannerSlider items={banners} />
      </S.SectionBanner>
    </Container>

    <S.SectionNews>
      <Showcase title={newGamesTitle} games={newGames} color="black" />
    </S.SectionNews>

    <Showcase
      title={mostPopularGamesTitle}
      highlight={mostPopularHighlight}
      games={mostPopularGames}
    />

    <Showcase
      title={upcomingGamesTitle}
      games={upcomingGames}
      highlight={upcomingHighlight}
    />

    <Showcase
      title={freeGamesTitle}
      highlight={freeHighlight}
      games={freeGames}
    />
  </Base>
);

export default Home;
