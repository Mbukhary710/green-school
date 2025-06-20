import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get('/api/gallery');
      setPhotos(res.data);
    };
    fetchImages();
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">School Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <img
            key={photo._id}
            src={photo.url}
            alt="Gallery"
            className="w-full h-48 object-cover rounded shadow"
          />
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
