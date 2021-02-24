import { Story, Meta } from '@storybook/react/types-6-0';
import ExploreSidebar, { ExploreSideBarProps } from '.';

import itemsMock from './mock';

export default {
  title: 'ExploreSidebar',
  component: ExploreSidebar,
  args: {
    items: itemsMock,
    onFilter: () => console.log('filter')
  },
  argTypes: {
    onFilter: {
      action: 'clicked'
    }
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta;

export const Default: Story<ExploreSideBarProps> = (args) => (
  <div style={{ padding: 16, maxWidth: 320 }}>
    <ExploreSidebar {...args} />
  </div>
);

export const WithInitialValues: Story<ExploreSideBarProps> = (args) => (
  <div style={{ padding: 16, maxWidth: 320 }}>
    <ExploreSidebar {...args} />
  </div>
);

WithInitialValues.args = {
  initialValues: { platforms: ['windows', 'linux'], sort_by: 'low-to-high' }
};
