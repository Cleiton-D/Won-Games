import { render, screen } from 'utils/test-utils';
import matchMediaMock from '../../../.jest/match-media-mock';

import Wishlist from '.';

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';
import React from 'react';

const props = {
  games: gamesMock,
  recommendedGames: gamesMock,
  recommendedHighlight: highlightMock
};

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  }
}));

jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Showcase" />;
  }
}));

describe('<Wishlist />', () => {
  beforeAll(() => {
    matchMediaMock.useMediaQuery('(min-width: 768px)');
  });

  it('should render correctly', () => {
    render(<Wishlist {...props} />);

    expect(
      screen.getByRole('heading', { name: /wishlist/i })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/population zero/i)).toHaveLength(6);

    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument();
  });

  it('should render empty when there are no games', () => {
    render(
      <Wishlist
        recommendedGames={gamesMock}
        recommendedHighlight={highlightMock}
      />
    );

    expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /your wishlist is empty/i })
    ).toBeInTheDocument();
  });
});
