import type { Preview } from '@storybook/nextjs-vite';

import '../src/app/globals.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'light', value: '#ffffff' },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
  decorators: [Story => <Story />],
};

export default preview;
