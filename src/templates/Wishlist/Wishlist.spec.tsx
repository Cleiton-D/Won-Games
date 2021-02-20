import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';
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
    renderWithTheme(<Wishlist {...props} />);

    expect(
      screen.getByRole('heading', { name: /wishlist/i })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/population zero/i)).toHaveLength(6);

    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument();
  });

  it('should render empty when there are no games', () => {
    renderWithTheme(
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
