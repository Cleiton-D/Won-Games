import { QueryGames_games } from 'graphql/generated/QueryGames';
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from 'graphql/generated/QueryHome';
import formatCurrency from 'utils/formatCurrency';

export const bannerMapper = (banners: QueryHome_banners[]) => {
  return banners.map((banner) => ({
    image: `http://localhost:1337${banner.image?.url}`,
    title: banner.title,
    subtitle: banner.subtitle,
    buttonLabel: banner.button?.label,
    buttonLink: banner.button?.link,
    ...(banner.ribbon && {
      ribbon: banner.ribbon.text,
      ribbonColor: banner.ribbon.color,
      ribbonSize: banner.ribbon.size
    })
  }));
};

export const gamesMapper = (games: QueryGames_games[] | null | undefined) => {
  if (!games) return [];

  return games.map((game) => ({
    id: game.id,
    title: game.name,
    slug: game.slug,
    developer: game.developers[0].name,
    image: `http://localhost:1337${game.cover?.url}`,
    price: game.price
  }));
};

export const highlightMapper = (
  highlight: QueryHome_sections_freeGames_highlight | null | undefined
) => {
  if (!highlight) return {};

  return {
    title: highlight.title,
    subtitle: highlight.subtitle,
    backgroundImage: `http://localhost:1337${highlight.background?.url}`,
    floatImage: `http://localhost:1337${highlight.floatImage?.url}`,
    buttonLabel: highlight.buttonLabel,
    buttonLink: highlight.buttonLink,
    alignment: highlight.alignment
  };
};

export const cartMapper = (games: QueryGames_games[] | undefined) => {
  if (!games) return [];

  return games.map((game) => ({
    id: game.id,
    image: `http://localhost:1337${game.cover?.url}`,
    price: formatCurrency(game.price),
    title: game.name
  }));
};
