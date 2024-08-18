import React from 'react';

const Navbar = ({ handleSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e.target.value);
    }
  };

  return (
    <nav className="flex flex-row justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-400">/</span>
        <a href='/' className="text-gray-700 font-semibold">Dashboard</a>
      </div>
      <input 
        type="text" 
        placeholder="Search widgets..." 
        className="p-1 border border-gray-300 rounded-md focus:outline-none w-64"
        onKeyPress={handleKeyPress} 
      />
    </nav>
  );
};

export default Navbar;
