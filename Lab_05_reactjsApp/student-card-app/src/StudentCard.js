import React from 'react';

function StudentCard(props) {
  const cardStyle = {
    backgroundColor: props.color || '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    color: '#333',
    width: '300px',
    textAlign: 'left'
  };

  return (
    <div style={cardStyle}>
      <h2>Name: {props.name}</h2>
      <p><strong>Roll No:</strong> {props.rollNo}</p>
      <p><strong>Department:</strong> {props.department}</p>
      <p><strong>University:</strong> {props.university}</p>
    </div>
  );
}

export default StudentCard;
