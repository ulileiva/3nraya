import { cva } from 'class-variance-authority';

export const fontVariant = cva('font-patrick', {
  variants: {
    isX: {
      true: 'text-blue-600',
      false: 'text-red-600',
    },
  },
});
