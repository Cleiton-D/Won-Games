import { Story, Meta } from '@storybook/react/types-6-0';
import CardIcon from '.';

export default {
  title: 'CardIcon',
  component: CardIcon,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta;

export const Default: Story = () => <CardIcon />;
export const WithItems: Story = (args) => <CardIcon {...args} />;

WithItems.args = {
  quantity: 4
};
