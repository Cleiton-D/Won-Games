import { Story, Meta } from '@storybook/react/types-6-0';

import highlightMock from 'components/Highlight/mock';
import gamesMock from 'components/GameCardSlider/mock';

import Showcase, { ShowcaseProps } from '.';

export default {
  title: 'Showcase',
  component: Showcase,
  decorators: [
    (Story) => (
      <div style={{ margin: '0 auto' }}>
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta;

export const Default: Story<ShowcaseProps> = (args) => <Showcase {...args} />;

Default.args = {
  title: 'Most popular',
  highlight: highlightMock,
  games: gamesMock
};

export const withoutHighlight: Story<ShowcaseProps> = (args) => (
  <Showcase {...args} />
);

withoutHighlight.args = {
  title: 'Most popular',
  games: gamesMock
};

export const withoutGames: Story<ShowcaseProps> = (args) => (
  <Showcase {...args} />
);

withoutGames.args = {
  title: 'Most popular',
  highlight: highlightMock
};
