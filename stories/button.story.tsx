import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '@components/button';

export const Status = () => {
  return (
    <div>
      <Button>
        <span>Default Button</span>
      </Button>
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
