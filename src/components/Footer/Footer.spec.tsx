import { render, screen } from 'utils/test-utils';

import Footer from '.';

describe('<Footer />', () => {
  it('should render 4 columns topics', () => {
    render(<Footer />);

    expect(
      screen.getByRole('heading', { name: /contact us/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /follow us/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /links/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /location/i })
    ).toBeInTheDocument();
  });
});
