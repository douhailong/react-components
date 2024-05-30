import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '@components/button';

export const Status = () => {
  return (
    <div>
      <Button>Primary Button</Button>
      <Button>Default Button</Button>
      <Button>Danger Button</Button>
      <Button>Disabled Button</Button>
      <Button>Default Button</Button>
    </div>
  );
};

export const Demo1 = () => {
  return <div>kkk</div>;
};

export default {
  title: 'Buttons'
};

// const meta = {
//   title: 'Example/Button',
//   component: Demo,
//   parameters: {},
//   tags: ['autodocs']
// } satisfies Meta<typeof Demo>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const Primary: Story = {
//   // args: {
//   //   // children: <>jjkkkkkkkk</>
//   //   // label: 'Button'
//   // }
// };
