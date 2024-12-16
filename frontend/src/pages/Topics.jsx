import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useSelector } from 'react-redux';  // Import to access user state
import { useNavigate } from 'react-router-dom';  // Import for programmatic navigation

const Topics = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const topics = [
    'array', 'string', 'hash table', 'dynamic programming', 'math', 'sorting', 'greedy', 'depth-first search',
    'database', 'binary search', 'matrix', 'tree', 'breadth-first search', 'bit manipulation', 'two pointers',
    'prefix sum', 'heap', 'binary tree', 'simulation', 'stack', 'graph', 'counting', 'sliding window', 'design',
    'backtracking', 'enumeration', 'union find', 'linked list', 'number theory', 'ordered set', 'monotonic stack',
    'trie', 'segment tree', 'bitmask', 'queue', 'recursion', 'combinatorics', 'binary indexed tree',
    'geometry', 'binary search tree', 'memoization', 'string matching', 'topological sort', 'shortest path',
    'rolling hash', 'game theory', 'monotonic queue', 'merge sort', 'counting sort', 'quickselect',
    'minimum spanning tree', 'line sweep',
  ];

  const handleTagSelect = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const handleNumChange = (e) => {
    if (/^\d+$/.test(e.target.value)) {
      setNumQuestions(e.target.value);
    }
  };

  const fetchQuestions = async () => {
    if (selectedTags.length === 0) {
      setError('Please select at least one topic');
      return;
    }
    setError('');
    try {
      const response = await axios.get(
        `https://alfa-leetcode-api.onrender.com/problems?tags=${selectedTags.join('+')}&limit=${numQuestions}`
      );
      setQuestions(response.data.problemsetQuestionList);
    } catch (error) {
      setError('Error fetching questions');
    }
  };

  // Authentication check: useSelector to get user from Redux state
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();  // Initialize useNavigate

  // If not logged in, navigate to the sign-in page
  if (!currentUser) {
    navigate("/sign-in");  // Redirect to sign-in page if no user
    return (
      <div>
        <h3>Please sign in to access this page.</h3>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="p-4 w-[80vw] mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">LeetCode Problem Finder</h2>

        <div className="mb-4 text-center">
          <h3 className="font-semibold text-lg mb-2">Select Topics</h3>
          <div className="p-3 border rounded-lg shadow-sm mb-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTagSelect(topic)}
                  className={`px-3 py-1.5 rounded-full border text-sm ${
                    selectedTags.includes(topic) ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 text-center">
          <label className="block text-sm font-semibold">Number of Questions:</label>
          <input
            type="text"
            value={numQuestions}
            onChange={handleNumChange}
            className="mt-1 px-3 py-2 border rounded-md w-16 text-sm"
            placeholder="Enter number"
          />
        </div>

        <div className="text-center">
          <button
            onClick={fetchQuestions}
            className="px-4 py-2 bg-blue-500 text-white rounded-full mt-4"
          >
            Get Questions
          </button>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {questions.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="table-auto w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-left">Question</th>
                  <th className="px-4 py-2 border-b text-left">Difficulty</th>
                  <th className="px-4 py-2 border-b text-left">ID</th>
                  <th className="px-4 py-2 border-b text-left">Link</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question.questionFrontendId} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{question.title}</td>
                    <td className="px-4 py-2 border-b">{question.difficulty}</td>
                    <td className="px-4 py-2 border-b">{question.questionFrontendId}</td>
                    <td className="px-4 py-2 border-b">
                      <a
                        href={`https://leetcode.com/problems/${question.titleSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        Link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 mt-6 text-center">Sorry, no questions found for the selected topics.</p>
        )}
      </div>
    </div>
  );
};

export default Topics;
