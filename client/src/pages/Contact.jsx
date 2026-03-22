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
      const apiBaseUrl = process.env.REACT_APP_API_URL;

      if (!apiBaseUrl) {
        throw new Error('REACT_APP_API_URL is not configured');
      }

      // Send form data to backend API
      await axios.post(`${apiBaseUrl}/api/contact`, formData);

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
      const serverMessage = err?.response?.data?.message;
      const statusCode = err?.response?.status;

      if (serverMessage) {
        setError(serverMessage);
      } else if (statusCode === 408) {
        setError('Contact server timed out (408). This usually means backend cannot connect to MongoDB Atlas. Please check backend environment variables and Atlas Network Access.');
      } else if (err?.code === 'ERR_NETWORK') {
        setError('Cannot reach contact server. Please check backend deployment, CORS, and API URL settings.');
      } else if (err?.message === 'REACT_APP_API_URL is not configured') {
        setError('Contact service is not configured yet.');
      } else {
        setError(`Failed to send message. ${err?.message || 'Please try again later.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl md:text-6xl font-bold tracking-tight text-slate-100">
            Let's Work Together
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            I'm open to internships, collaborations, and exciting opportunities. Whether you have a question or want to discuss a project, feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/50 p-8"
            >
              {/* Success Message */}
              {success && (
                <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-sm text-green-300 flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <div>
                    <div className="font-semibold">Message sent successfully!</div>
                    <div className="text-xs mt-1 opacity-80">I'll get back to you as soon as possible.</div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-300 flex items-start gap-3">
                  <span className="text-lg">✗</span>
                  <div>{error}</div>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-200">
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
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-200">
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
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-slate-200">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Internship Inquiry"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, opportunity, or question..."
                  rows="6"
                  required
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg border border-cyan-400/50 bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8">
              <h3 className="mb-6 text-lg font-bold text-slate-100">Direct Contact</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Email</div>
                  <a
                    href="mailto:srabonahmed2002@gmail.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium break-all"
                  >
                    srabonahmed2002@gmail.com
                  </a>
                </div>

                {/* Location */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Location</div>
                  <p className="text-slate-300">Bangladesh</p>
                </div>

                {/* Availability */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Availability</div>
                  <p className="flex items-center gap-2 text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Available Now
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8">
              <h3 className="mb-6 text-lg font-bold text-slate-100">Connect With Me</h3>
              
              <div className="space-y-3">
                <a
                  href="https://www.linkedin.com/in/sheikh-srabon-ahmed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/50 p-3 transition-all hover:border-slate-600 hover:bg-slate-800/50"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-cyan-400">
                    <path d="M5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-1.5 6h3V21h-3V9ZM10 9h2.9v1.7h.1c.4-.8 1.4-1.9 3-1.9 3.2 0 3.8 2.1 3.8 4.8V21h-3v-6.5c0-1.5 0-3.5-2.1-3.5s-2.4 1.7-2.4 3.4V21h-3V9Z" />
                  </svg>
                  <span className="text-sm font-medium text-slate-300">LinkedIn</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/50 p-3 transition-all hover:border-slate-600 hover:bg-slate-800/50"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-cyan-400">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                  <span className="text-sm font-medium text-slate-300">GitHub</span>
                </a>

                <a
                  href="https://www.facebook.com/Srabon.Ahmed22/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/50 p-3 transition-all hover:border-slate-600 hover:bg-slate-800/50"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-cyan-400">
                    <path d="M13.5 9H16V6h-2.5C10.8 6 9 7.8 9 10.5V13H6v3h3v6h3v-6h3l1-3h-4v-2.5c0-.8.7-1.5 1.5-1.5Z" />
                  </svg>
                  <span className="text-sm font-medium text-slate-300">Facebook</span>
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="rounded-lg border border-cyan-400/30 bg-cyan-400/5 p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300 mb-2">Response Time</div>
              <p className="text-sm text-slate-300">
                I typically respond within 24 hours during weekdays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
