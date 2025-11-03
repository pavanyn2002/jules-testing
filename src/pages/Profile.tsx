import React, { useState, useEffect } from 'react';
import { getFromLocalStorage } from '../utils/localStorage';

const Profile: React.FC = () => {
  const [totalXp, setTotalXp] = useState<number>(0);

  useEffect(() => {
    const xp = getFromLocalStorage('totalXp') || 0;
    setTotalXp(xp);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold">Your Progress</h2>
        <p className="mt-4">
          <span className="font-bold">Total XP:</span> {totalXp}
        </p>
      </div>
    </div>
  );
};

export default Profile;
