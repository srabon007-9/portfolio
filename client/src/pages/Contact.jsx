// Import React hooks
import React, { useState } from 'react';
import axios from 'axios';

// Contact page - Contact form
function Contact() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // State for form submission
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Send form data to backend API
      await axios.post(`${process.env.REACT_APP_API_URL}/api/contact`, formData);

      // Show success message
      setSuccess(true);

      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Page Title */}
        <h1 className="mb-3 text-center text-4xl font-semibold text-slate-100 md:text-5xl">
          Get In Touch
        </h1>

        {/* Subtitle */}
        <p className="mb-10 text-center text-base text-slate-400 md:text-lg">
          I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="neo-card space-y-6 rounded-xl p-8"
        >
          {/* Success Message */}
          {success && (
            <div className="rounded-md border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">
              ✓ Thank you! Your message has been sent successfully. I'll get back to you soon!
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              ✗ {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-cyan-300/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-cyan-300/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-200">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project Inquiry"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-cyan-300/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows="6"
              required
              className="w-full resize-none rounded-md border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-cyan-300/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md border border-cyan-300/60 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-100 transition-all hover:shadow-[0_0_28px_rgba(34,211,238,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Email */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center">
            <h3 className="mb-2 font-medium text-slate-100">Email</h3>
            <p className="text-sm text-slate-400">your.email@example.com</p>
          </div>

          {/* Phone */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center">
            <h3 className="mb-2 font-medium text-slate-100">Phone</h3>
            <p className="text-sm text-slate-400">+1 (555) 123-4567</p>
          </div>

          {/* Location */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center">
            <h3 className="mb-2 font-medium text-slate-100">Location</h3>
            <p className="text-sm text-slate-400">City, Country</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
