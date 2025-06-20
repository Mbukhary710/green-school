import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) return;

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('caption', caption);

    try {
      setUploading(true);
      const token = localStorage.getItem('adminToken');
      
      // ✅ Removed unused variable `res`
      await axios.post('/api/photos/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('✅ Photo uploaded successfully');
      setCaption('');
      setPhoto(null);
    } catch (err) {
      setMessage('❌ Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg space-y-4">
        <div>
          <label className="block font-medium">Photo</label>
          <input type="file" onChange={handlePhotoChange} required className="mt-2" />
        </div>

        <div>
          <label className="block font-medium">Caption (optional)</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="Enter caption"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>

        {message && <p className="mt-4 text-center font-semibold">{message}</p>}
      </form>
    </div>
  );
};

export default AdminDashboard;
