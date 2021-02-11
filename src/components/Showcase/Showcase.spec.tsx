import 'match-media-mock';
import { screen } from '@testing-library/react';

import highlightMock from 'components/Highlight/mock';
import gamesMock from 'components/GameCardSlider/mock';

import Showcase from '.';
import { renderWithTheme } from 'utils/tests/helpers';

const props = {
  title: 'Most popular',
  highlight: highlightMock,
  games: gamesMock.slice(0, 1)
};

describe('<Showcase />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Showcase {...props} />);

    expect(
      screen.getByRole('heading', { name: /most popular/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: highlightMock.title })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: gamesMock[0].title })
    ).toBeInTheDocument();
  });

  it('should render without title', () => {
    renderWithTheme(
      <Showcase games={props.games} highlight={props.highlight} />
    );

    screen.getByRole('heading', { name: highlightMock.title });
    screen.getByRole('heading', { name: gamesMock[0].title });

    expect(
      screen.queryByRole('heading', { name: /most popular/i })
    ).not.toBeInTheDocument();
  });

  it('should render without highlight', () => {
    renderWithTheme(<Showcase title={props.title} games={props.games} />);

    screen.getByRole('heading', { name: /most popular/i });
    screen.getByRole('heading', { name: gamesMock[0].title });

    expect(
      screen.queryByRole('heading', { name: highlightMock.title })
    ).not.toBeInTheDocument();
  });

  it('should render without games', () => {
    renderWithTheme(
      <Showcase title={props.title} highlight={props.highlight} />
    );

    screen.getByRole('heading', { name: /most popular/i });
    screen.getByRole('heading', { name: highlightMock.title });

    expect(
      screen.queryByRole('heading', { name: gamesMock[0].title })
    ).not.toBeInTheDocument();
  });
});