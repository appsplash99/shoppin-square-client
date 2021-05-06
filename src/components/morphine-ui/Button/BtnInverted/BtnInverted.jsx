import React from 'react';
import './BtnInverted.css';
import { btnSizes } from '../btnSizes';
import { btnInvertedVariants } from './btnInvertedVariants';

export const BtnInverted = ({
  children,
  styleProp,
  classNameProp,
  handleOnClickProp,
  btnSize,
  variant,
  shape = 'rounded',
}) => {
  return (
    <button
      type="button"
      style={styleProp}
      onClick={handleOnClickProp}
      className={[
        'btn',
        'btn--inverted',
        `${shape === 'rounded' && 'border-radius--default-btn'}`,
        `${shape === 'capsule' && 'border-radius--capsule'}`,
        `${btnSize ? btnSizes[btnSize] : btnSizes.md}`,
        `${variant ? btnInvertedVariants[variant] : ''}`,
        `${classNameProp}`,
      ].join(' ')}
    >
      {children || 'Default Btn'}
    </button>
  );
};
