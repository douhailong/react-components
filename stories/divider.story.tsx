// import React from 'react';
// import Devider from '../components/divider';

// export const Demo = () => (
//   <div>
//     <Devider />
//   </div>
// );

// export default {
//   title: 'Divider'
// };

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '@components/button/Button';

import Divider from '@components/divider';

const meta = {
  title: 'Example/Divider',
  component: Divider,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
  // argTypes: {
  //   backgroundColor: { control: 'color' }
  // },
  // args: { onClick: fn() }
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // primary: true,
    // label: 'Button'
  }
};
