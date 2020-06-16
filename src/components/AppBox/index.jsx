import React from 'react';

export default props => {
  const { src, children } = props;
  return (
    <span>
      <img className="eos-app-box" src={src} />
      {children}
    </span>
  );
};
