import { render, screen } from 'utils/test-utils';

import matchMedia from '../../../.jest/match-media-mock';

import Auth from '.';

describe('<Auth />', () => {
  beforeAll(() => {
    matchMedia.useMediaQuery('(min-width: 768px)');
  });

  it('should render all components and children', () => {
    render(
      <Auth title="Auth Title">
        <input type="text" />
      </Auth>
    );

    expect(screen.getAllByRole('img', { name: /won games/i })).toHaveLength(2);

    expect(
      screen.getByRole('heading', {
        name: /all your favorite games in one place/i
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /won is the best and most complete gaming platform/i
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /auth title/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
