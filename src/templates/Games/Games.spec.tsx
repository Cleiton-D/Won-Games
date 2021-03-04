import { screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import matchMedia from '../../../.jest/match-media-mock';

import { renderWithTheme } from 'utils/tests/helpers';
import apolloCache from 'utils/apolloCache';

import Games from '.';

import filterItemsMock from 'components/ExploreSidebar/mock';
import { fetchMoreMock, gamesMock, noGamesmock } from './mocks';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const push = jest.fn();

jest.mock('next/link', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  }
}));

useRouter.mockImplementation(() => ({
  push,
  query: '',
  asPath: '',
  route: '/'
}));

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  }
}));

describe('<Games />', () => {
  beforeAll(() => {
    matchMedia.useMediaQuery('(min-width: 768px)');
  });

  it('should render sections', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock]} addTypename={false}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    // we await until we have data to get the elements
    expect(await screen.findByText('Price')).toBeInTheDocument();

    expect(await screen.findByText(/Sample Game/i)).toBeInTheDocument();

    expect(
      await screen.findByRole('button', { name: /show more/i })
    ).toBeInTheDocument();
  });

  it('should render more games then show more is clicked', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock, fetchMoreMock]} cache={apolloCache}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    userEvent.click(await screen.findByRole('button', { name: /show more/i }));

    expect(await screen.findByText(/Fetch More Game/i)).toBeInTheDocument();
  });

  it('should render empty then no games found', async () => {
    renderWithTheme(
      <MockedProvider mocks={[noGamesmock]} addTypename={false}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    expect(
      await screen.findByText(/we didn'd find any games with this filter/i)
    ).toBeInTheDocument();
  });

  it('should change push router when selecting a filter', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock, fetchMoreMock]} cache={apolloCache}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    userEvent.click(await screen.findByRole('checkbox', { name: /windows/i }));
    userEvent.click(await screen.findByRole('checkbox', { name: /linux/i }));
    userEvent.click(await screen.findByLabelText(/low to high/i));

    expect(push).toHaveBeenCalledWith({
      pathname: '/games',
      query: { platforms: ['windows', 'linux'], sort_by: 'low-to-high' }
    });
  });
});
