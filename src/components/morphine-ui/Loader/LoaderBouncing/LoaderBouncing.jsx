import './LoaderBouncing.css';

const loaderSizes = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
};

export const LoaderBouncing = ({ size, dotBgColor }) => {
  return (
    <div className="bouncing-loader">
      <div
        className="bouncing-loader__dots"
        style={{
          height: loaderSizes[size || 'md'],
          width: loaderSizes[size || 'md'],
          backgroundColor: dotBgColor,
        }}
      />
      <div
        className="bouncing-loader__dots"
        style={{
          height: loaderSizes[size || 'md'],
          width: loaderSizes[size || 'md'],
          backgroundColor: dotBgColor,
        }}
      />
      <div
        className="bouncing-loader__dots"
        style={{
          height: loaderSizes[size || 'md'],
          width: loaderSizes[size || 'md'],
          backgroundColor: dotBgColor,
        }}
      />
    </div>
  );
};
