import React from 'react';

const ContactUs = () => {
  return (
    <section className="bg-green-50 py-10 px-6" id="contact">
      <h2 className="text-2xl font-semibold text-green-700 text-center mb-6">Contact Us</h2>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-700 mb-4">
          Reach out to Green School Academy for inquiries or support.
        </p>
        <div className="mb-6 text-center">
          <p className="text-green-800 font-semibold">Phone: 08146796232</p>
          <p className="text-green-800 font-semibold">Email: bukharimuhd2@gmail.com</p>
        </div>
        <form className="grid gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-700 text-white py-2 rounded hover:bg-green-800 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
