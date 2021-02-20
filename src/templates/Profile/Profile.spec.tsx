import { renderWithTheme } from 'utils/tests/helpers';
import matchMedia from '../../../.jest/match-media-mock';

import FormProfile from 'components/FormProfile';
import Profile from '.';

describe('<Profile />', () => {
  beforeAll(() => {
    matchMedia.useMediaQuery('(min-width: 768px)');
  });

  it('should render the heading', () => {
    renderWithTheme(
      <Profile>
        <FormProfile />
      </Profile>
    );
  });
});
