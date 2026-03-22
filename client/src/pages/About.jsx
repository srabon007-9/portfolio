// About page - Information about the developer
function About() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Page Title */}
        <h1 className="mb-8 text-center text-4xl font-semibold text-slate-100 md:text-5xl">
          About Me
        </h1>

        {/* About Content */}
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-4 text-2xl font-semibold text-slate-100">Who I Am</h2>
          <p className="mb-4 leading-relaxed text-slate-400">
            Hello! I am <span className="font-medium text-slate-200">Sheikh Srabon Ahmed</span>. I am a
            Computer Science student at <span className="font-medium text-slate-200">BRAC University</span>{' '}
            and I enjoy building clean, modern web applications with the MERN stack.
          </p>
          <p className="leading-relaxed text-slate-400">
            Outside of coding, I love travelling on my bike and exploring new places. I am always excited
            to learn new technologies and improve my development skills.
          </p>
        </div>

        {/* Experience Section */}
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-6 text-2xl font-semibold text-slate-100">Learning Journey</h2>
          <div className="space-y-6">
            {/* Experience Item */}
            <div className="border-l-2 border-slate-700 pl-4">
              <h3 className="text-lg font-medium text-slate-100">Aspiring MERN Developer</h3>
              <p className="text-sm text-slate-500">Self-learning | Present</p>
              <p className="mt-2 text-slate-400">
                Currently focused on learning MongoDB, Express, React, and Node.js by building hands-on
                projects and improving problem-solving skills every day.
              </p>
            </div>

            {/* Experience Item */}
            <div className="border-l-2 border-slate-700 pl-4">
              <h3 className="text-lg font-medium text-slate-100">Personal Projects</h3>
              <p className="text-sm text-slate-500">Practice-based learning</p>
              <p className="mt-2 text-slate-400">
                Building responsive web apps and portfolio projects to apply frontend and backend concepts,
                strengthen fundamentals, and grow as a developer.
              </p>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-6 text-2xl font-semibold text-slate-100">Education</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-slate-100">Bachelor of Science in Computer Science</h3>
              <p className="text-sm text-slate-500">BRAC University | 2024 - 2028</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-6 text-2xl font-semibold text-slate-100">Find Me Online</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a
              href="https://www.facebook.com/Srabon.Ahmed22/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-cyan-300/50 hover:text-cyan-200"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M13.5 9H16V6h-2.5C10.8 6 9 7.8 9 10.5V13H6v3h3v6h3v-6h3l1-3h-4v-2.5c0-.8.7-1.5 1.5-1.5Z" />
              </svg>
              Facebook
            </a>

            <a
              href="https://www.instagram.com/srabon_op/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-cyan-300/50 hover:text-cyan-200"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm4.75-2.75a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z" />
              </svg>
              Instagram
            </a>

            <a
              href="https://www.linkedin.com/in/sheikh-srabon-ahmed/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-cyan-300/50 hover:text-cyan-200"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-1.5 6h3V21h-3V9ZM10 9h2.9v1.7h.1c.4-.8 1.4-1.9 3-1.9 3.2 0 3.8 2.1 3.8 4.8V21h-3v-6.5c0-1.5 0-3.5-2.1-3.5s-2.4 1.7-2.4 3.4V21h-3V9Z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
