import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '@components/button';

export const Status = () => {
  return (
    <div>
      <div style={{ margin: '8px 0' }}>type</div>
      <div style={{ display: 'flex', gap: 6, padding: 8 }}>
        <Button type='primary' ghost>
          Primary Button
        </Button>
        <Button>Default Button</Button>
        <Button type='dashed'>Text Button</Button>
        <Button type='link'>Link Button</Button>
        <Button type='text'>Text Button</Button>
      </div>

      <div style={{ margin: '8px 0' }}>size</div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Button type='primary' size='lg'>
          Large Button
        </Button>
        <Button>Middle Button</Button>
        <Button size='sm'>Small Button</Button>
      </div>

      <div style={{ margin: '8px 0' }}>danger</div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Button type='primary' size='lg'>
          Large Button
        </Button>
        <Button>Middle Button</Button>
        <Button size='sm'>Small Button</Button>
      </div>
    </div>
  );
};

export const Demo1 = () => {
  return <div>kkk</div>;
};

export default {
  title: 'Buttons'
};
