import React, { useState, useEffect } from 'react';
import { getFromLocalStorage } from '../utils/localStorage';
import ProgressBar from '../components/ProgressBar';

const Profile: React.FC = () => {
  const [totalXp, setTotalXp] = useState<number>(0);

  useEffect(() => {
    const xp = getFromLocalStorage('totalXp') || 0;
    setTotalXp(xp);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-thin mb-6 text-center text-noir-accent">Your Profile</h1>
      <div className="bg-gray-900 border border-noir-border shadow-lg shadow-noir-accent/10 rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-3xl font-semibold text-noir-accent mb-6">Your Progress</h2>
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-lg text-noir-text">Total XP:</span>
          <span className="text-2xl font-mono text-noir-accent">{totalXp}</span>
        </div>
        <ProgressBar progress={totalXp / 10} />
      </div>
    </div>
  );
};

export default Profile;
