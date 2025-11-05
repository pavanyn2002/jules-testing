import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const activeLinkStyle = {
    color: '#00ffff', // noir-accent
  };

  return (
    <nav className="bg-noir-bg border-b border-noir-border p-4">
      <ul className="flex space-x-6 container mx-auto">
        <li>
          <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/learn" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
            Learn
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/aichat" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
            AI Chat
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
