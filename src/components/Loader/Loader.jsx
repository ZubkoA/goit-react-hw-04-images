import { Bars } from 'react-loader-spinner';
import React from 'react';

const Loader = () => {
  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  return (
    <div style={style}>
      <Bars color="#3f51b5" />
    </div>
  );
};

export default Loader;
