import React, { useState } from 'react';
import axios from 'axios';

const ResultUpload = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    className: '',
    term: '',
    session: '',
    subjects: [{ name: '', score: '' }],
  });

  const token = localStorage.getItem('adminToken');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (index, e) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index][e.target.name] = e.target.value;
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: '', score: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/results', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('✅ Result uploaded successfully');
      setFormData({
        studentName: '',
        className: '',
        term: '',
        session: '',
        subjects: [{ name: '', score: '' }],
      });
    } catch (error) {
      console.error(error);
      alert('❌ Failed to upload result');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Student Result</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded">
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="className"
          placeholder="Class (e.g. Primary 3)"
          value={formData.className}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="term"
          placeholder="Term (e.g. First Term)"
          value={formData.term}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="session"
          placeholder="Session (e.g. 2024/2025)"
          value={formData.session}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="space-y-2">
          <h3 className="font-semibold">Subjects & Scores</h3>
          {formData.subjects.map((subject, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                name="name"
                placeholder="Subject Name"
                value={subject.name}
                onChange={(e) => handleSubjectChange(index, e)}
                className="flex-1 border p-2 rounded"
                required
              />
              <input
                type="number"
                name="score"
                placeholder="Score"
                value={subject.score}
                onChange={(e) => handleSubjectChange(index, e)}
                className="w-24 border p-2 rounded"
                required
              />
            </div>
          ))}
          <button type="button" onClick={addSubject} className="text-blue-600 hover:underline">
            + Add Subject
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Result
        </button>
      </form>
    </div>
  );
};

export default ResultUpload;
