import React from 'react';
import { FaStar } from 'react-icons/fa';
import {
  iconDefaultStyles,
  iconShapeVariants,
  badgeDataDefaultStyles,
  badgeDataValidatedStyles,
} from './dataBadgeIconStyles';

export const DataBadgeIcon = ({
  icon,
  showBadgeData = true,
  disableRipple = false,
  variant = 'rounded',
  data,
  badgeDataStyleProp = {},
  iconStyleProp = {},
}) => {
  return (
    <div
      style={{
        ...iconDefaultStyles,
        ...iconShapeVariants(variant),
        ...iconStyleProp,
        overflow: !disableRipple ? 'visible' : '', // has conflicts with ripple effect
      }}
      className={`${!disableRipple && 'ripple'}`}
    >
      {icon || <FaStar className="text--lg" />}
      {showBadgeData && (
        <span
          style={{
            ...badgeDataDefaultStyles,
            ...badgeDataValidatedStyles(data),
            ...badgeDataStyleProp,
          }}
        >
          {data}
        </span>
      )}
    </div>
  );
};
