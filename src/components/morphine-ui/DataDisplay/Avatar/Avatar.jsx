import React from 'react';
import './Avatar.css';
import { avatarSizes } from './avatarSizes';

export const Avatar = ({
  imageSrc,
  size = 'md',
  showStatusBadge = true,
  avatarStatus = 'online',
  variant = 'rounded',
  badgePosition = { bottom: 0, right: 0 },
}) => {
  const avatarStatusTypes = {
    online: 'bg--success',
    offline: 'bg--danger',
  };
  return (
    <div className="flex align-items--c justify-content--c">
      <div className="flex flex--column" style={{ position: 'relative' }}>
        <img
          src={imageSrc || 'https://material-ui.com/static/images/avatar/2.jpg'}
          alt="Avatar"
          className={[
            'avatar__img',
            `${avatarSizes[size].imageSize}`,
            `${variant === 'square' && 'avatar-image-square'}`,
            `${variant === 'rounded' && 'avatar-image-rounded'}`,
            `${variant === 'circular' && 'avatar-image-circular'}`,
          ].join(' ')}
        />
        {showStatusBadge && (
          <span
            className={[
              'border-radius--50',
              `${avatarSizes[size].badgeSize}`,
              `${avatarStatusTypes[avatarStatus]}`,
            ].join(' ')}
            style={{
              position: 'absolute',
              ...badgePosition,
            }}
          />
        )}
      </div>
    </div>
  );
};
