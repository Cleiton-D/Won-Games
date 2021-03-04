import { QueryGames_games } from 'graphql/generated/QueryGames';
import {
  QueryHome_banners,
  QueryHome_sections_newGames_highlight
} from 'graphql/generated/QueryHome';
import { bannerMapper, gamesMapper, highlightMapper } from './';

describe('bannerMapper()', () => {
  it('should return the right format when mapped', () => {
    const banner = {
      image: {
        url: '/image_url'
      },
      title: 'Banner title',
      subtitle: 'Banner subtitle',
      button: {
        label: 'Button label',
        link: '/button-link'
      },
      ribbon: {
        text: 'Ribbon text',
        color: 'primary',
        size: 'normal'
      }
    } as QueryHome_banners;

    expect(bannerMapper([banner])).toStrictEqual([
      {
        image: 'http://localhost:1337/image_url',
        title: 'Banner title',
        subtitle: 'Banner subtitle',
        buttonLabel: 'Button label',
        buttonLink: '/button-link',
        ribbon: 'Ribbon text',
        ribbonColor: 'primary',
        ribbonSize: 'normal'
      }
    ]);
  });
});

describe('gamesMapper()', () => {
  it('should return and empty array if the are no games', () => {
    expect(gamesMapper(null)).toStrictEqual([]);
  });

  it('should return the correct format when mapped', () => {
    const game = {
      id: '1',
      name: 'game',
      developers: [
        {
          name: 'developer'
        }
      ],
      slug: 'game',
      cover: {
        url: '/cover-image'
      },
      price: 10
    } as QueryGames_games;

    expect(gamesMapper([game])).toStrictEqual([
      {
        id: '1',
        title: 'game',
        slug: 'game',
        developer: 'developer',
        image: 'http://localhost:1337/cover-image',
        price: 10
      }
    ]);
  });
});

describe('highlightMapper()', () => {
  it('should return empty object if no highlight', () => {
    expect(highlightMapper(null)).toStrictEqual({});
  });

  it('should return mapped highlight', () => {
    const highlight = {
      title: 'title',
      subtitle: 'subtitle',
      background: {
        url: '/image.jpg'
      },
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'right',
      floatImage: {
        url: '/image.jpg'
      }
    } as QueryHome_sections_newGames_highlight;

    expect(highlightMapper(highlight)).toStrictEqual({
      title: 'title',
      subtitle: 'subtitle',
      backgroundImage: 'http://localhost:1337/image.jpg',
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'right',
      floatImage: 'http://localhost:1337/image.jpg'
    });
  });
});
