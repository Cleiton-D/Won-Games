import { initializeApollo } from 'utils/apollo';
import { gamesMapper, highlightMapper } from 'utils/mappers';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';

import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist';

import gamesMock from 'components/GameCardSlider/mock';

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />;
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const {
    data: { recommended }
  } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  });

  return {
    props: {
      games: gamesMock,
      recommendedTitle: recommended?.section?.title || null,
      recommendedGames: gamesMapper(recommended?.section?.games),
      recommendedHighlight: highlightMapper(recommended?.section?.highlight)
    }
  };
}
