import React from 'react';

function CourseItem(props) {
  const itemStyle = {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '12px',
    marginBottom: '8px',
    backgroundColor: '#fafafa',
    textAlign: 'left'
  };

  return (
    <div style={itemStyle}>
      <h3>Course: {props.courseName}</h3>
      <p><strong>Instructor:</strong> {props.instructor}</p>
      <p><strong>Duration:</strong> {props.duration}</p>
      {props.courseType && <p><strong>Type:</strong> <span style={{ color: props.courseType === 'Online' ? 'green' : 'blue' }}>{props.courseType}</span></p>}
    </div>
  );
}

export default CourseItem;
