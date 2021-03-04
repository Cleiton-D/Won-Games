import { initializeApollo } from 'utils/apollo';
import { QueryHome, QueryHomeVariables } from 'graphql/generated/QueryHome';
import { QUERY_HOME } from 'graphql/queries/home';
import { bannerMapper, gamesMapper, highlightMapper } from 'utils/mappers';

import Home, { HomeTemplateProps } from 'templates/Home';

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />;
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const currentDate = new Date().toISOString().slice(0, 10);

  const {
    data: { banners, newGames, upcomingGames, freeGames, sections }
  } = await apolloClient.query<QueryHome, QueryHomeVariables>({
    query: QUERY_HOME,
    variables: {
      date: currentDate
    },
    fetchPolicy: 'no-cache'
  });

  return {
    revalidate: 60,
    props: {
      banners: bannerMapper(banners),
      newGames: gamesMapper(newGames),
      newGamesTitle: sections?.newGames?.title,
      mostPopularHighlight: highlightMapper(sections?.popularGames?.highlight),
      mostPopularGamesTitle: sections?.popularGames?.title,
      mostPopularGames: gamesMapper(sections!.popularGames!.games),
      upcomingGames: gamesMapper(upcomingGames),
      upcomingGamesTitle: sections?.upcomingGames?.title,
      upcomingHighlight: highlightMapper(sections?.upcomingGames?.highlight),
      freeGames: gamesMapper(freeGames),
      freeGamesTitle: sections?.freeGames?.title,
      freeHighlight: highlightMapper(sections?.freeGames?.highlight)
    }
  };
}
