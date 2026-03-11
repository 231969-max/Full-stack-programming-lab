import React from 'react';

function Greeting(props) {
  const containerStyle = {
    backgroundColor: props.bgColor || '#fff',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    textAlign: 'center',
    width: '300px'
  };

  let greetingMessage = '';
  if (props.timeOfDay === 'Morning') {
    greetingMessage = 'Good Morning';
  } else if (props.timeOfDay === 'Afternoon') {
    greetingMessage = 'Good Afternoon';
  } else if (props.timeOfDay === 'Evening') {
    greetingMessage = 'Good Evening';
  } else {
    greetingMessage = 'Hello';
  }

  return (
    <div style={containerStyle}>
      <h2>{greetingMessage}, {props.name}!</h2>
    </div>
  );
}

export default Greeting;
