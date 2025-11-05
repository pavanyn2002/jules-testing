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
      <h1 className="text-4xl font-thin text-noir-accent mb-2">{course.title}</h1>
      <p className="mb-8 text-gray-400">{course.description}</p>

      <div className="mb-8 p-6 border border-noir-border rounded-lg">
        <h2 className="text-3xl font-semibold text-noir-accent mb-4">Lesson Sections</h2>
        <ul className="list-disc pl-5 space-y-2 text-noir-text">
          {course.sections.map((section, index) => (
            <li key={index}>{section}</li>
          ))}
        </ul>
      </div>

      <CodeBlock />

      {quiz && (
        <div className="mt-8 p-6 border border-noir-border rounded-lg">
          <h2 className="text-3xl font-semibold text-noir-accent mb-4">Quiz</h2>
          {isCompleted ? (
            <p className="text-noir-accent font-bold">You have already completed this lesson!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              {quiz.map((q, index) => (
                <div key={index} className="mb-6">
                  <p className="font-semibold text-noir-text mb-2">{q.q}</p>
                  {q.options.map((option, i) => (
                    <div key={i} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        id={`q${index}-option${i}`}
                        value={i}
                        onChange={() => handleAnswerChange(index, i)}
                        required
                        className="form-radio h-4 w-4 text-noir-accent bg-noir-bg border-noir-border focus:ring-noir-accent"
                      />
                      <label htmlFor={`q${index}-option${i}`} className="ml-3 text-noir-text">{option}</label>
                    </div>
                  ))}
                </div>
              ))}
              <button
                type="submit"
                className="bg-noir-accent text-noir-bg font-bold py-2 px-6 rounded-full transition-all duration-300 hover:bg-opacity-80"
              >
                Submit Quiz
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Lesson;
