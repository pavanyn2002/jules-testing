import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/learn">Learn</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/aichat">AI Chat</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
