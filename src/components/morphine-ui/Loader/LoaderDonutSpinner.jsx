import './LoaderDonutSpinner.css';
import {
  spinnerStyleXS,
  spinnerStyleSM,
  spinnerStyleMD,
  spinnerStyleLG,
  spinnerStyleXL,
  spinnerStyleXXL,
  spinnerStyleXXXL,
} from './donutSpinnerLoaderStyles';

export const LoaderDonutSpinner = ({
  classNameProp,
  styleProp,
  variant,
  size,
}) => {
  const donutSpinnerSizes = {
    xs: spinnerStyleXS,
    sm: spinnerStyleSM,
    md: spinnerStyleMD,
    lg: spinnerStyleLG,
    xl: spinnerStyleXL,
    xxl: spinnerStyleXXL,
    xxxl: spinnerStyleXXXL,
  };

  const spinnerVariants = {
    primary: 'var(--themePrimary)',
    secondary: 'var(--themeSecondary)',
    dark: 'var(--dark)',
    light: 'var(--light)',
  };

  return (
    <div
      className={['donut-spinner-loader', classNameProp].join(' ')}
      style={{
        ...donutSpinnerSizes[size || 'md'],
        borderLeftColor: spinnerVariants[variant || 'primary'],
        ...styleProp,
      }}
    />
  );
};
