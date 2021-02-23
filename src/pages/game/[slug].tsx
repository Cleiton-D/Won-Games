import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

import { initializeApollo } from 'utils/apollo';
import { gamesMapper } from 'utils/mappers';
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames';
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import {
  QueryGameBySlug,
  QueryGameBySlugVariables
} from 'graphql/generated/QueryGameBySlug';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';

import Game, { GameTemplateProps } from 'templates/Game';

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

const apolloClient = initializeApollo();

export default function Index(props: GameTemplateProps) {
  const router = useRouter();

  // aqui tu pode colocar um loading fiao
  // caso a pagina nao tinha sido gerada ainda
  if (router.isFallback) return null;

  return <Game {...props} />;
}

// gerar em build time (/game/bla, /game/foo)
export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 }
  });

  const paths = data.games.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // GET GAME DATA
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` }
  });

  if (!data.games.length) {
    return { notFound: true, props: {} };
  }

  const game = data.games[0];

  // GET RECOMMENDED GAMES
  const {
    data: { recommended }
  } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  });

  return {
    props: {
      revalidate: 60,
      cover: `http://localhost:1337${game.cover?.src}`,
      gameInfo: {
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((image) => ({
        src: `http://localhost:1337${image.src}`,
        label: image.label
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcomingGames: gamesMock,
      upcomingHighlight: highlightMock,
      recommendedTitle: recommended?.section?.title || null,
      recommendedGames: gamesMapper(recommended?.section?.games)
    }
  };
};
