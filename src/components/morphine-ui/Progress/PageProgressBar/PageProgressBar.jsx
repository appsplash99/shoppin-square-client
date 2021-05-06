import React, { useEffect } from 'react';

export const PageProgressBar = ({
  color,
  height,
  width,
  setWidth,
  ...rest
}) => {
  const watchScrolling = () => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    const winScroll = document.body.scrollTop || scrollTop;
    const winHeight = scrollHeight - clientHeight;
    const scrolled = `${(winScroll / winHeight) * 100}%`;
    return winHeight > 0 ? setWidth(scrolled) : setWidth(0);
  };

  useEffect(() => {
    window.addEventListener('scroll', watchScrolling);
    return () => {
      window.removeEventListener('scroll', watchScrolling);
    };
  }, [color, height]);

  const pageProgressBarStyles = {
    marginTop: 0,
    padding: 0,
    background: color || 'var(--themePrimary)',
    position: 'fixed',
    height: height || 4,
    width,
    top: 0,
    zIndex: 'var(--zIndex--pageProgressBar)',
    transition: 'width 0.05s ease-out',
  };

  return <div style={pageProgressBarStyles} {...rest} />;
};
