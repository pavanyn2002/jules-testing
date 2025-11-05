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
      <h1 className="text-4xl font-thin mb-6 text-center text-noir-accent">Learning Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(courses as Course[]).map((course) => (
          <Link
            to={`/lesson/${course.id}`}
            key={course.id}
            className="border border-noir-border p-6 rounded-lg transition-all duration-300 hover:border-noir-accent hover:shadow-lg hover:shadow-noir-accent/20"
          >
            <h2 className="text-2xl font-semibold text-noir-accent mb-2">{course.title}</h2>
            <p className="text-noir-text">{course.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Learn;
