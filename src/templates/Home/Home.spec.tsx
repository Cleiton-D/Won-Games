import { render, screen } from 'utils/test-utils';

import matchMedia from '../../../.jest/match-media-mock';

import bannersMock from 'components/BannerSlider/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import Home from '.';

const props = {
  banners: bannersMock,
  newGames: [gamesMock[0]],
  newGamesTitle: 'New Games',
  mostPopularHighlight: highlightMock,
  mostPopularGamesTitle: 'Most Popular',
  mostPopularGames: [gamesMock[0]],
  upcomingGames: [gamesMock[0]],
  upcomingGamesTitle: 'Upcoming',
  upcomingHighlight: highlightMock,
  freeGames: [gamesMock[0]],
  freeGamesTitle: 'Free',
  freeHighlight: highlightMock
};

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  }
}));

jest.mock('components/Showcase', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock showcase"></div>;
    }
  };
});

jest.mock('components/BannerSlider', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock bannerslider"></div>;
    }
  };
});

describe('<Home />', () => {
  beforeAll(() => {
    matchMedia.useMediaQuery('(max-width: 768px)');
  });

  it('should render banner and showcase', () => {
    render(<Home {...props} />);

    expect(screen.getByTestId(/mock bannerslider/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/mock showcase/i)).toHaveLength(4);
  });
});
