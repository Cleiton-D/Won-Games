import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import MatchMediaMock from 'jest-matchmedia-mock';

import MediaMatch from '.';

describe('<MediaMatch />', () => {
  let desktopHeading: Element | undefined;
  let mobileHeading: Element | undefined;
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

    try {
      desktopHeading = screen.getByTestId('desktop');
    } catch {
      desktopHeading = undefined;
    }
    try {
      mobileHeading = screen.getByTestId('mobile');
    } catch {
      mobileHeading = undefined;
    }
  }

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  beforeEach(() => {
    desktopHeading = undefined;
    mobileHeading = undefined;
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it('should be hidden if no media query is passed', () => {
    renderItems();

    expect(desktopHeading).toBeUndefined();
    expect(mobileHeading).toBeUndefined();
  });

  it('should show mobile and hide desktop with max-width: 768px', () => {
    matchMedia.useMediaQuery('(max-width: 768px)');
    renderItems();

    expect(mobileHeading).toBeDefined();
    expect(desktopHeading).toBeUndefined();
  });

  it('should show desktop and hide mobile with min-width: 768px', () => {
    matchMedia.useMediaQuery('(min-width: 768px)');
    renderItems();

    expect(desktopHeading).toBeDefined();
    expect(mobileHeading).toBeUndefined();
  });
});
