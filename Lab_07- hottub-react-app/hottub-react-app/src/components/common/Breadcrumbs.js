import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ paths }) => {
  return (
    <div className="container xl:w-[1100px] mx-auto px-4 py-4 text-xs text-hot-red">
      <Link to="/" className="hover:underline">Home</Link>
      {paths.map((path, index) => (
        <span key={index}>
          <span className="text-gray-400 mx-1">&gt;</span>
          <span className={index === paths.length - 1 ? "text-gray-600" : "hover:underline"}>
            {index === paths.length - 1 ? (
              path.name
            ) : (
              <Link to={path.url}>{path.name}</Link>
            )}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
