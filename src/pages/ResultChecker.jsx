// src/pages/ResultChecker.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';

const ResultChecker = () => {
  const [form, setForm] = useState({
    studentName: '',
    classLevel: '',
    term: '',
    session: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const resultRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckResult = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/results/check`, form);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6 print:p-0">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8 print:shadow-none print:bg-white" ref={resultRef}>
        <h1 className="text-2xl font-bold mb-6 text-green-600 text-center print:text-black">🎓 Green School Result Checker</h1>

        <form onSubmit={handleCheckResult} className="space-y-4 print:hidden">
          <input
            type="text"
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
            required
            placeholder="Student Full Name"
            className="w-full border rounded px-4 py-2"
          />
          <select
            name="classLevel"
            value={form.classLevel}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Select Class</option>
            {[
              'Nursery 1', 'Nursery 2', 'Nursery 3',
              'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
              'JSS 1', 'JSS 2', 'JSS 3',
            ].map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          <select
            name="term"
            value={form.term}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Select Term</option>
            <option value="1st Term">1st Term</option>
            <option value="2nd Term">2nd Term</option>
            <option value="3rd Term">3rd Term</option>
          </select>
          <input
            type="text"
            name="session"
            value={form.session}
            onChange={handleChange}
            required
            placeholder="e.g. 2024/2025"
            className="w-full border rounded px-4 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? 'Checking...' : 'Check Result'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        {result && (
          <div className="mt-6 bg-green-100 p-4 rounded print:bg-white print:p-0 print:text-black">
            <div className="flex items-center justify-between mb-4 print:flex-col print:items-start print:gap-2">
              <div>
                <h2 className="text-xl font-bold text-green-700 print:text-black">Result Found</h2>
                <p><strong>Student:</strong> {result.student.fullName}</p>
                <p><strong>Class:</strong> {result.classLevel}</p>
                <p><strong>Term:</strong> {result.term}</p>
                <p><strong>Session:</strong> {result.session}</p>
                <p><strong>Average:</strong> {result.averageScore.toFixed(2)}</p>
                <p><strong>Grade:</strong> {result.grade}</p>
                <p><strong>Remark:</strong> {result.remark}</p>
              </div>
              {result.student.photo && (
                <img
                  src={result.student.photo}
                  alt="Student"
                  className="w-28 h-28 object-cover rounded-full border-2 border-green-500 print:border-black"
                />
              )}
            </div>

            <h3 className="mt-4 font-bold">Subjects:</h3>
            <ul className="list-disc list-inside">
              {result.subjects.map((sub, idx) => (
                <li key={idx}>{sub.name}: {sub.score}</li>
              ))}
            </ul>

            <button
              onClick={handlePrint}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 print:hidden"
            >
              Print / Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultChecker;
