import './App.css';
import Greeting from './Greeting';

function App() {
  return (
    <div className="App" style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Lab Task 3: Dynamic Greeting App</h1>
      <Greeting name="Alice" timeOfDay="Morning" bgColor="#fff2e8" />
      <Greeting name="Bob" timeOfDay="Afternoon" bgColor="#e6fffb" />
      <Greeting name="Charlie" timeOfDay="Evening" bgColor="#f9f0ff" />
    </div>
  );
}

export default App;
