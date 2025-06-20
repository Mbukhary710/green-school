import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const ResultList = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/results');
        setResults(res.data);
      } catch (err) {
        console.error(err);
        alert('❌ Failed to load results');
      }
    };

    fetchResults();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">📄 Uploaded Results</h2>
        {results.length === 0 ? (
          <p>No results uploaded yet.</p>
        ) : (
          results.map((result, idx) => (
            <div key={idx} className="border p-4 mb-4 rounded bg-white shadow">
              <h3 className="font-semibold text-lg">{result.studentName}</h3>
              <p>Class: {result.className}</p>
              <p>Term: {result.term}</p>
              <p>Session: {result.session}</p>
              <div className="mt-2">
                <p className="font-medium">Subjects:</p>
                <ul className="list-disc list-inside">
                  {result.subjects.map((sub, i) => (
                    <li key={i}>{sub.name} - {sub.score}</li>
                  ))}
                </ul>

                {/* PDF View Button */}
                <a
                  href={`http://localhost:5000/api/results/${result._id}/pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  View PDF
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ResultList;
