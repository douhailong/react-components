import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '@components/button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: <>jjkkkkkkkk</>
    // label: 'Button'
  }
};