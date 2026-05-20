import './App.css';
import StudentCard from './StudentCard';

function App() {
  return (
    <div className="App" style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Lab Task 1: Student Information Card App</h1>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <StudentCard 
          name="Alice Johnson" 
          rollNo="101" 
          department="Computer Science" 
          university="Air University" 
          color="#e6f7ff" 
        />
        <StudentCard 
          name="Bob Smith" 
          rollNo="102" 
          department="Software Engineering" 
          university="NUST" 
          color="#f6ffed" 
        />
        <StudentCard 
          name="Charlie Davis" 
          rollNo="103" 
          department="AI & ML" 
          university="FAST NUCES" 
          color="#fffb8f" 
        />
      </div>
    </div>
  );
}

export default App;
