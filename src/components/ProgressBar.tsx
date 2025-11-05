import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5 border border-noir-border">
      <div
        className="bg-noir-accent h-2.5 rounded-full"
        style={{ width: `${safeProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
