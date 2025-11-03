import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import courses from '../data/courses.json';
import quizzes from '../data/quizzes.json';
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorage';
import { calculateXp } from '../utils/xpLogic';
import CodeBlock from '../components/CodeBlock';

// Define interfaces for type safety
interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  sections: string[];
  quiz: string;
}

const typedQuizzes: { [key: string]: QuizQuestion[] } = quizzes;

const Lesson: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Find the current course
  const course = (courses as Course[]).find(c => c.id === lessonId);

  useEffect(() => {
    if (course) {
      const progress = getFromLocalStorage('progress') || {};
      if (progress[course.id]) {
        setIsCompleted(true);
      }
    }
  }, [course]);

  if (!course) {
    return <div className="p-4">Lesson not found.</div>;
  }

  const quiz = typedQuizzes[course.quiz];

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    quiz.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        score++;
      }
    });

    const isAlreadyCompleted = getFromLocalStorage('progress')?.[course.id] || false;

    if (score === quiz.length) {
      // Award XP only if the lesson is being completed for the first time
      if (!isAlreadyCompleted) {
        const earnedXp = calculateXp(score);
        const currentXp = getFromLocalStorage('totalXp') || 0;
        const newTotalXp = currentXp + earnedXp;
        setToLocalStorage('totalXp', newTotalXp);
        alert(`Quiz passed! You earned ${earnedXp} XP.`);
      } else {
        alert('Quiz passed!');
      }

      const progress = getFromLocalStorage('progress') || {};
      progress[course.id] = true;
      setToLocalStorage('progress', progress);
      setIsCompleted(true);

    } else {
      alert('Quiz failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="mb-6 text-gray-600">{course.description}</p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Lesson Sections</h2>
        <ul className="list-disc pl-5 space-y-2">
          {course.sections.map((section, index) => (
            <li key={index}>{section}</li>
          ))}
        </ul>
      </div>

      <CodeBlock />

      {quiz && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quiz</h2>
          {isCompleted ? (
            <p className="text-green-500 font-bold">You have already completed this lesson!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              {quiz.map((q, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">{q.q}</p>
                  {q.options.map((option, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        id={`q${index}-option${i}`}
                        value={i}
                        onChange={() => handleAnswerChange(index, i)}
                        required
                      />
                      <label htmlFor={`q${index}-option${i}`} className="ml-2">{option}</label>
                    </div>
                  ))}
                </div>
              ))}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Quiz</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Lesson;
