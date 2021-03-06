import { render, screen } from 'utils/test-utils';

import '../../../.jest/match-media-mock';

import GameDetails, { GameDetailsProps } from '.';

const props: GameDetailsProps = {
  developer: 'Diferent Tales',
  releaseDate: '2020-11-21T23:00:00',
  platforms: ['windows', 'linux', 'mac'],
  publisher: 'Walkabout',
  rating: 'BR0',
  genres: ['Role-playing', 'Narrative']
};

describe('<GameDetails />', () => {
  it('should render the heading', () => {
    render(<GameDetails {...props} />);

    expect(
      screen.getByRole('heading', { name: /developer/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /release date/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /platforms/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /publisher/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /rating/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /genres/i })
    ).toBeInTheDocument();
  });

  it('should render platform icons', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByRole('img', { name: /linux/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /windows/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /mac/i })).toBeInTheDocument();
  });

  it('should render the formated date', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByText('Nov 21, 2020')).toBeInTheDocument();
  });

  it('should render free rating when BR0', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByText(/free/i)).toBeInTheDocument();
  });

  it('should render the developer', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByText(/Diferent Tales/i)).toBeInTheDocument();
  });

  it('should render the publisher', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByText(/Walkabout/i)).toBeInTheDocument();
  });

  it('should render 18+ rating when BR18', () => {
    render(<GameDetails {...props} rating="BR18" />);

    expect(screen.getByText(/18\+/i)).toBeInTheDocument();
  });

  it('should render a list of genres', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByText('Role-playing / Narrative')).toBeInTheDocument();
  });
});
