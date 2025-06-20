import React, { useState } from 'react';
import axios from 'axios';

const UploadPhoto = () => {
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');

  const handleUpload = async () => {
    if (!file) return alert('Please choose a file');

    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.post('/api/gallery/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Photo uploaded successfully!');
    } catch (err) {
      alert('Upload failed!');
    }
  };

  return (
    <div className="mt-6 p-4 bg-white shadow rounded">
      <h3 className="text-xl font-bold mb-2">Upload New Photo</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadPhoto;
