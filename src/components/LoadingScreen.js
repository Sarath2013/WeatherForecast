import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingScreen = () => {
  return (
    <div className="loader-content center-content">
      <div className="loader-text">Loading ...</div>
      <CircularProgress />
    </div>
  );
}

export default LoadingScreen;