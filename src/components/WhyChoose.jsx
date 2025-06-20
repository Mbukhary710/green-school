import React from 'react';

const WhyChoose = () => {
  return (
    <section className="bg-white py-10 px-6 text-center" id="why-choose">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Why Choose Green School?</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-green-50 p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-2">Qualified Teachers</h3>
          <p className="text-gray-600">Our staff are experienced and certified educators passionate about learning.</p>
        </div>
        <div className="bg-green-50 p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-2">Moral Training</h3>
          <p className="text-gray-600">We emphasize good character, discipline, and Islamic values.</p>
        </div>
        <div className="bg-green-50 p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-2">Modern Facilities</h3>
          <p className="text-gray-600">Equipped with up-to-date classrooms, labs, and ICT centers.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
