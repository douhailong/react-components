// import type { Meta, StoryObj } from '@storybook/react';
import Button from '@components/button';

export const Demo = () => {
  return (
    <div>
      <div style={{ margin: '8px 0' }}>type</div>
      <div style={{ display: 'flex', gap: 6, background: 'rgb(190, 200, 200)', padding: 12 }}>
        <Button type='primary' iconPosition='end' icon={<span>111</span>}>
          Primary Button
        </Button>
        <Button>Default Button</Button>
        <Button type='dashed'>Dashed Button</Button>
        <Button type='link'>Link Button</Button>
        <Button type='text'>Text Button</Button>
      </div>

      <div style={{ margin: '8px 0' }}>ghost</div>
      <div style={{ display: 'flex', gap: 6, background: 'rgb(190, 200, 200)', padding: 12 }}>
        <Button danger ghost>
          Primary Button
        </Button>
        <Button ghost>Default Button</Button>
        <Button ghost type='dashed'>
          Dashed Button
        </Button>
        <Button ghost type='link'>
          Link Button
        </Button>
        <Button ghost type='text' danger>
          Text Button
        </Button>
      </div>

      <div style={{ margin: '8px 0' }}>danger</div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Button danger type='primary'>
          Primary Button
        </Button>
        <Button danger>Default Button</Button>
        <Button danger type='dashed'>
          Dashed Button
        </Button>
        <Button danger type='link'>
          Link Button
        </Button>
        <Button danger type='text'>
          Text Button
        </Button>
      </div>

      <div style={{ margin: '8px 0' }}>size</div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Button size='lg'>Large Button</Button>
        <Button type='primary'>Middle Button</Button>
        <Button size='sm'>Small Button</Button>
      </div>

      <div style={{ margin: '8px 0' }}>block</div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Button type='primary' block danger>
          Block Button
        </Button>
        <Button type='primary' block>
          Block Button
        </Button>
      </div>
    </div>
  );
};

export default {
  title: 'Buttons'
};
