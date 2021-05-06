export const btnIconSizes = {
  xxxs: { height: 'var(--space-xxxs)', width: 'var(--space-xxxs)' },
  xxs: { height: 'var(--space-xxs)', width: 'var(--space-xxs)' },
  xs: { height: 'var(--space-xs)', width: 'var(--space-xs)' },
  sm: { height: 'var(--space-sm)', width: 'var(--space-sm)' },
  md: { height: 'var(--space-md)', width: 'var(--space-md)' },
  lg: { height: 'var(--space-lg)', width: 'var(--space-lg)' },
  xl: { height: 'var(--space-xl)', width: 'var(--space-xl)' },
  xxl: { height: 'var(--space-xxl)', width: 'var(--space-xxl)' },
  xxxl: { height: 'var(--space-xxxl)', width: 'var(--space-xxxl)' },
};

export const btnIconShapeVariants = (variant) => {
  if (variant === 'circular') {
    return { borderRadius: '50%' };
  }
  if (variant === 'rounded') {
    return { borderRadius: '20%' };
  }
  return { borderRadius: '0px' };
};
