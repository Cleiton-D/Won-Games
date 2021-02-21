import { Story, Meta } from '@storybook/react/types-6-0';
import CardIcon, { CartItemProps } from '.';

export default {
  title: 'CardIcon',
  component: CardIcon,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta;

export const Default: Story<CartItemProps> = (args) => <CardIcon {...args} />;
export const WithItems: Story<CartItemProps> = (args) => <CardIcon {...args} />;

WithItems.args = {
  quantity: 4
};
