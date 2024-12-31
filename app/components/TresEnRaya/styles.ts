import { cva } from 'class-variance-authority';

export const fontVariant = cva('font-patrick', {
  variants: {
    isX: {
      true: 'text-yellow-400',
      false: 'text-red-600',
    },
  },
});
