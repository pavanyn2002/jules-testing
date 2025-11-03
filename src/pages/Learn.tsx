import React from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses.json';

interface Course {
  id: string;
  title: string;
  description: string;
}

const Learn: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Learning Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(courses as Course[]).map((course) => (
          <Link to={`/lesson/${course.id}`} key={course.id} className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold">{course.title}</h2>
            <p>{course.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Learn;
