import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    schoolName: '',
    mission: '',
    vision: '',
    welcomeMessage: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Load existing settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/settings');
        if (data) {
          setSettings({
            schoolName: data.schoolName || '',
            mission: data.mission || '',
            vision: data.vision || '',
            welcomeMessage: data.welcomeMessage || '',
          });
        }
      } catch (error) {
        setMessage('❌ Failed to load settings');
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken'); // Or replace with your actual admin auth method

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send token if auth protected
        },
      };

      const { data } = await axios.put('/api/settings', settings, config);
      setMessage(data.message || '✅ Settings saved successfully');
    } catch (error) {
      setMessage('❌ Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
      {message && <div className="mb-4 text-sm">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="schoolName"
          value={settings.schoolName}
          onChange={handleChange}
          placeholder="School Name"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="mission"
          value={settings.mission}
          onChange={handleChange}
          placeholder="School Mission"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="vision"
          value={settings.vision}
          onChange={handleChange}
          placeholder="School Vision"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="welcomeMessage"
          value={settings.welcomeMessage}
          onChange={handleChange}
          placeholder="Homepage Welcome Message"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
