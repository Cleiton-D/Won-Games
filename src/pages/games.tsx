import { initializeApollo } from 'utils/apollo';
import { QUERY_GAMES } from 'graphql/queries/games';
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames';

import Games, { GamesProps } from 'templates/Games';

import filterItemsMock from 'components/ExploreSidebar/mock';

export default function GamesPage(props: GamesProps) {
  return <Games {...props} />;
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: {
      limit: 9
    }
  });

  return {
    props: {
      revalidate: 60,
      filterItems: filterItemsMock,
      games: data.games.map((game) => ({
        title: game.name,
        developer: game.developers[0].name,
        image: `http://127.0.0.1:1337${game.cover!.url}`,
        price: new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'USD'
        }).format(game.price)
      }))
    }
  };
}
