import { render, screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';

import MediaMatch from '.';

describe('<MediaMatch />', () => {
  let desktopHeading: Element | null;
  let mobileHeading: Element | null;
  let matchMedia: MatchMediaMock;

  function renderItems() {
    render(
      <>
        <MediaMatch greatherThan="medium">
          <h1 data-testid="desktop">Desktop</h1>
        </MediaMatch>
        <MediaMatch lessThan="medium">
          <h1 data-testid="mobile">Mobile</h1>
        </MediaMatch>
      </>
    );

    desktopHeading = screen.queryByTestId('desktop');
    mobileHeading = screen.queryByTestId('mobile');
  }

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  beforeEach(() => {
    desktopHeading = null;
    mobileHeading = null;
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it('should be hidden if no media query is passed', () => {
    renderItems();

    expect(desktopHeading).not.toBeInTheDocument();
    expect(mobileHeading).not.toBeInTheDocument();
  });

  it('should show mobile and hide desktop with max-width: 768px', () => {
    matchMedia.useMediaQuery('(max-width: 768px)');
    renderItems();

    expect(mobileHeading).toBeInTheDocument();
    expect(desktopHeading).not.toBeInTheDocument();
  });

  it('should show desktop and hide mobile with min-width: 768px', () => {
    matchMedia.useMediaQuery('(min-width: 768px)');
    renderItems();

    expect(desktopHeading).toBeInTheDocument();
    expect(mobileHeading).not.toBeInTheDocument();
  });
});
