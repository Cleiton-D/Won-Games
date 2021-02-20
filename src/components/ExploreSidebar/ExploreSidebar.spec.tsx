import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from 'utils/tests/helpers';
import matchMedia from '../../../.jest/match-media-mock';

import ExploreSidebar from '.';

import itemsMock from './mock';
import theme from 'styles/theme';

describe('<ExploreSidebar />', () => {
  beforeAll(() => {
    matchMedia.useMediaQuery('(min-width: 768px)');
  });

  it('should render headings', () => {
    renderWithTheme(<ExploreSidebar items={itemsMock} onFilter={jest.fn()} />);

    expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /sort by/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /system/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /genre/i })).toBeInTheDocument();
  });

  it('should render inputs', () => {
    renderWithTheme(<ExploreSidebar items={itemsMock} onFilter={jest.fn()} />);
    expect(
      screen.getByRole('checkbox', { name: /under \$50/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('radio', { name: /low to high/i })
    ).toBeInTheDocument();
  });

  it('should render the filter button', () => {
    renderWithTheme(<ExploreSidebar items={itemsMock} onFilter={jest.fn()} />);

    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
  });

  it('should check initial values that are passed', () => {
    renderWithTheme(
      <ExploreSidebar
        items={itemsMock}
        initialValues={{ windows: true, sort_by: 'low-to-high' }}
        onFilter={jest.fn()}
      />
    );

    expect(screen.getByRole('checkbox', { name: /windows/i })).toBeChecked();
    expect(screen.getByRole('radio', { name: /low to high/i })).toBeChecked();
  });

  it('should filter with initial values', () => {
    const onFilter = jest.fn();

    renderWithTheme(
      <ExploreSidebar
        items={itemsMock}
        initialValues={{ windows: true, sort_by: 'low-to-high' }}
        onFilter={onFilter}
      />
    );

    userEvent.click(screen.getByRole('button', { name: /filter/i }));
    expect(onFilter).toBeCalledWith({ windows: true, sort_by: 'low-to-high' });
  });

  it('should filter with checked values', () => {
    const onFilter = jest.fn();

    renderWithTheme(<ExploreSidebar items={itemsMock} onFilter={onFilter} />);

    userEvent.click(screen.getByRole('checkbox', { name: /windows/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /linux/i }));
    userEvent.click(screen.getByRole('radio', { name: /low to high/i }));

    userEvent.click(screen.getByRole('button', { name: /filter/i }));

    expect(onFilter).toBeCalledWith({
      windows: true,
      linux: true,
      sort_by: 'low-to-high'
    });
  });

  it('should altern between radio options', () => {
    const onFilter = jest.fn();

    renderWithTheme(<ExploreSidebar items={itemsMock} onFilter={onFilter} />);

    userEvent.click(screen.getByRole('radio', { name: /low to high/i }));
    userEvent.click(screen.getByRole('radio', { name: /high to low/i }));

    userEvent.click(screen.getByRole('button', { name: /filter/i }));

    expect(onFilter).toBeCalledWith({ sort_by: 'high-to-low' });
  });

  it('should render open filters button on mobile', () => {
    matchMedia.useMediaQuery('(max-width: 768px)');

    renderWithTheme(<ExploreSidebar items={itemsMock} onFilter={jest.fn()} />);

    expect(screen.getByLabelText(/open filters/i)).toBeInTheDocument();
  });

  it('should open filters on click in open button', async () => {
    matchMedia.useMediaQuery('(max-width: 768px)');

    renderWithTheme(<ExploreSidebar items={itemsMock} onFilter={jest.fn()} />);

    userEvent.click(screen.getByLabelText(/open filters/i));

    expect(screen.getByLabelText(/filters sidebar/i)).toHaveStyleRule(
      'z-index',
      String(theme.layers.modal),
      { media: '(max-width: 768px)' }
    );
    expect(
      screen.getByLabelText(/filters sidebar/i)
    ).toHaveStyleRule('position', 'fixed', { media: '(max-width: 768px)' });

    expect(screen.getByLabelText(/filters sidebar/i)).toHaveStyleRule(
      'width',
      '100%',
      { media: '(max-width: 768px)' }
    );

    expect(screen.getByLabelText(/filters sidebar/i)).toHaveStyleRule(
      'height',
      '100vh',
      { media: '(max-width: 768px)' }
    );

    expect(screen.queryByLabelText(/open filters/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/close filters/i)).toBeInTheDocument();
  });

  it('should close filters on click in close button', async () => {
    matchMedia.useMediaQuery('(max-width: 768px)');

    renderWithTheme(<ExploreSidebar items={itemsMock} onFilter={jest.fn()} />);

    userEvent.click(screen.getByLabelText(/open filters/i));
    userEvent.click(screen.getByLabelText(/close filters/i));

    expect(screen.getByLabelText(/filters sidebar/i)).not.toHaveStyleRule(
      'z-index',
      String(theme.layers.modal),
      {
        media: '(max-width: 768px)'
      }
    );
    expect(
      screen.getByLabelText(/filters sidebar/i)
    ).not.toHaveStyleRule('position', 'fixed', { media: '(max-width: 768px)' });

    expect(
      screen.getByLabelText(/filters sidebar/i)
    ).not.toHaveStyleRule('width', '100%', { media: '(max-width: 768px)' });

    expect(
      screen.getByLabelText(/filters sidebar/i)
    ).not.toHaveStyleRule('height', '100vh', { media: '(max-width: 768px)' });

    expect(screen.getByLabelText(/open filters/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/close filters/i)).not.toBeInTheDocument();
  });
});
