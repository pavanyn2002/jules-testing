import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div>
      <div style={{ width: `${progress}%`, backgroundColor: 'green', height: '20px' }}></div>
    </div>
  );
};

export default ProgressBar;
