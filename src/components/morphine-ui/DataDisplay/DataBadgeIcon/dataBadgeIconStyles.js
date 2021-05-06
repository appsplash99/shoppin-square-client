export const iconDefaultStyles = {
  position: 'relative',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'var(--space-sm)',
  height: '48px',
  width: '48px',
  fontSize: 'var(text--lg)',
  backgroundColor: 'lightblue',
  padding: 'var(--space-xs)',
};

export const badgeDataDefaultStyles = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  top: '-10px',
  right: '-5px',
  backgroundColor: 'lightpink',
  fontSize: 'var(--text-sm)',
  height: '20px',
};

export const badgeDataValidatedStyles = (data) => {
  switch (true) {
    case data > 9:
      return {
        padding: '0.25rem 0.3rem',
        borderRadius: '500px',
      };
    case data > 0:
      return {
        padding: '0.25rem',
        width: '20px',
      };
    case data === 0 || !data:
      return { display: 'none' };

    default:
      return {};
  }
};

export const iconShapeVariants = (variant) => {
  if (variant === 'circular') {
    return { borderRadius: '50%' };
  }
  if (variant === 'rounded') {
    return { borderRadius: '20%' };
  }
  return { borderRadius: '0px' };
};
