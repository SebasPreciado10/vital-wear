import React from 'react';

const NavButton = ({ icon, label, isActive, onClick }) => {
  return (
    <button 
      className="flex flex-col items-center space-y-1 px-2"
      onClick={onClick}
    >
      <div className={`${isActive ? 'text-black' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span className={`text-xs ${isActive ? 'text-black' : 'text-gray-400'}`}>
        {label}
      </span>
    </button>
  );
};

export default NavButton;