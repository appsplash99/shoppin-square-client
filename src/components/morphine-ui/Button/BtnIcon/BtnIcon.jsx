import React from 'react';
import './BtnIcon.css';
import { GiMuscleUp } from 'react-icons/gi';
import { btnIconSizes, btnIconShapeVariants } from './btnIconSizes';

export const BtnIcon = ({
  children,
  styleProp,
  classNameProp,
  handleOnClickProp,
  disableRipple = false,
  btnSize = 'md',
  variant = 'circular',
}) => {
  return (
    <button
      type="button"
      onClick={handleOnClickProp}
      className={[
        'btn',
        'btn--icon',
        `${!disableRipple && 'ripple'}`,
        `${classNameProp}`,
      ].join(' ')}
      style={{
        ...btnIconSizes[btnSize],
        ...btnIconShapeVariants(variant),
        overflow: !disableRipple ? 'visible' : '', // has conflicts with ripple effect
        ...styleProp,
      }}
    >
      {children || <GiMuscleUp className="text--xl" />}
    </button>
  );
};
