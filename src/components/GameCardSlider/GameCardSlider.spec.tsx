import 'match-media-mock';
import { render, screen } from 'utils/test-utils';

import GameCardSlider from '.';

const items = [
  {
    title: 'Population Zero',
    slug: 'population-zero',
    developer: 'Rockstar Games',
    image: 'https://source.unsplash.com/user/willianjusten/300x140',
    price: 235,
    promotionalPrice: 215
  },
  {
    title: 'Population Zero',
    slug: 'population-zero',
    developer: 'Rockstar Games',
    image: 'https://source.unsplash.com/user/willianjusten/300x141',
    price: 235,
    promotionalPrice: 215
  },
  {
    title: 'Population Zero',
    slug: 'population-zero',
    developer: 'Rockstar Games',
    image: 'https://source.unsplash.com/user/willianjusten/300x142',
    price: 235,
    promotionalPrice: 215
  },
  {
    title: 'Population Zero',
    slug: 'population-zero',
    developer: 'Rockstar Games',
    image: 'https://source.unsplash.com/user/willianjusten/300x143',
    price: 235,
    promotionalPrice: 215
  },
  {
    title: 'Population Zero',
    slug: 'population-zero',
    developer: 'Rockstar Games',
    image: 'https://source.unsplash.com/user/willianjusten/300x144',
    price: 235,
    promotionalPrice: 215
  },
  {
    title: 'Population Zero',
    slug: 'population-zero',
    developer: 'Rockstar Games',
    image: 'https://source.unsplash.com/user/willianjusten/300x145',
    price: 235,
    promotionalPrice: 215
  }
];

describe('<GameCardSlider />', () => {
  it('should render with 4 active items', () => {
    const { container } = render(
      <GameCardSlider items={items} color="white" />
    );
    expect(container.querySelectorAll('.slick-active')).toHaveLength(4);
  });

  it('should render white arrows as default', () => {
    render(<GameCardSlider items={items} />);

    expect(screen.getByLabelText(/previous games/i)).toHaveStyle({
      color: '#FAFAFA'
    });
    expect(screen.getByLabelText(/next games/i)).toHaveStyle({
      color: '#FAFAFA'
    });
  });

  it('should render black arrows when this color is passed', () => {
    render(<GameCardSlider items={items} color="black" />);

    expect(screen.getByLabelText(/previous games/i)).toHaveStyle({
      color: '#030517'
    });
    expect(screen.getByLabelText(/next games/i)).toHaveStyle({
      color: '#030517'
    });
  });
});
