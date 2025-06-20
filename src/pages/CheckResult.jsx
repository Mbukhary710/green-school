import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const CheckResult = () => {
  const [studentName, setStudentName] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [term, setTerm] = useState('');
  const [session, setSession] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validate input fields
  const validateInput = () => {
    if (!studentName.trim() || !classLevel.trim() || !term.trim() || !session.trim() || !password.trim()) {
      setError('All fields are required.');
      return false;
    }
    if (!['First', 'Second', 'Third'].includes(term)) {
      setError('Term must be "First", "Second", or "Third".');
      return false;
    }
    if (!/^\d{4}\/\d{4}$/.test(session)) {
      setError('Session must be in the format "YYYY/YYYY".');
      return false;
    }
    return true;
  };

  const handleCheckResult = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/results/check', {
        studentName,
        className: classLevel,
        term,
        session,
        password,
      });
      setResult(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error checking result');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(40, 100, 60);
    doc.text('Green School Result', 105, 20, { align: 'center' });
    doc.setDrawColor(0, 102, 51);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Student Name: ${result.student.fullName}`, 20, 35);
    doc.text(`Class: ${result.classLevel}`, 20, 43);
    doc.text(`Session: ${result.session}`, 20, 51);
    doc.text(`Term: ${result.term}`, 20, 59);
    doc.text(`Total Score: ${result.totalScore}`, 20, 67);
    doc.text(`Average Score: ${result.averageScore}`, 20, 75);
    doc.text(`Grade: ${result.grade}`, 20, 83);
    doc.text(`Remark: ${result.remark}`, 20, 91);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Subjects', 20, 105);
    doc.setDrawColor(0);
    doc.line(20, 107, 190, 107);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    let yOffset = 115;

    result.subjects.forEach((sub, index) => {
      doc.text(`${index + 1}. ${sub.name}`, 25, yOffset);
      doc.text(`${sub.score}`, 160, yOffset, { align: 'right' });
      yOffset += 8;
    });

    doc.save(`${result.student.fullName}-Result.pdf`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Check Your Result</h1>
      <form
        onSubmit={handleCheckResult}
        className="bg-white p-6 rounded shadow max-w-md w-full space-y-4"
      >
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Class Level"
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Term (First, Second, or Third)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Session (e.g., 2023/2024)"
          value={session}
          onChange={(e) => setSession(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Result Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`p-2 rounded w-full ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white`}
        >
          {isLoading ? 'Loading...' : 'Check Result'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="bg-white p-6 rounded shadow mt-6 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-green-700">Result</h2>
          <div className="mb-4">
            <p>Student Name: {result.student.fullName}</p>
            <p>Class: {result.classLevel}</p>
            <p>Term: {result.term}</p>
            <p>Session: {result.session}</p>
            <p>Total Score: {result.totalScore}</p>
            <p>Average Score: {result.averageScore}</p>
            <p>Grade: {result.grade}</p>
            <p>Remark: {result.remark}</p>
            <h3 className="font-bold mt-4">Subjects</h3>
            <ul className="list-disc list-inside">
              {result.subjects.map((sub, i) => (
                <li key={i}>
                  {sub.name}: {sub.score}
                </li>
              ))}
            </ul>
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
            >
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckResult;
