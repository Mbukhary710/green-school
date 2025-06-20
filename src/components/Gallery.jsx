import React, { useState } from 'react';

const Gallery = ({ user }) => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImages([...images, url]);
    }
  };

  return (
    <section id="gallery" className="p-10 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">Photo Gallery</h2>

      {/* Only show upload input to admin */}
      {user?.role === 'admin' && (
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="mb-6"
        />
      )}

      {user?.role !== 'admin' && (
        <p className="text-sm text-gray-600 mb-6 italic">Only admins can upload images.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`gallery-${index}`}
            className="rounded shadow hover:scale-105 transition-transform"
            onClick={() => setSelected(img)}
          />
        ))}
      </div>

      {/* Modal view */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <img src={selected} alt="Selected" className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg" />
        </div>
      )}
    </section>
  );
};

export default Gallery;
