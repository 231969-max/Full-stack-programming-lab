import './App.css';
import CourseItem from './CourseItem';

function App() {
  const courses = [
    { id: 1, courseName: 'React for Beginners', instructor: 'John Doe', duration: '4 weeks', courseType: 'Online' },
    { id: 2, courseName: 'Advanced CSS', instructor: 'Jane Smith', duration: '3 weeks', courseType: 'Offline' },
    { id: 3, courseName: 'Node.js Backend', instructor: 'Alice Johnson', duration: '6 weeks', courseType: 'Online' },
    { id: 4, courseName: 'UI/UX Design', instructor: 'Bob Martin', duration: '5 weeks', courseType: 'Offline' },
    { id: 5, courseName: 'Full Stack Development', instructor: 'Charlie Davis', duration: '12 weeks', courseType: 'Online' }
  ];

  return (
    <div className="App" style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Lab Task 2: Course List App</h1>
      <div>
        {courses.map(course => (
          <CourseItem 
            key={course.id}
            courseName={course.courseName}
            instructor={course.instructor}
            duration={course.duration}
            courseType={course.courseType}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
