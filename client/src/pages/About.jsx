// About page - Information about the developer
function About() {
  return (
    <div className="min-h-screen px-4 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="mb-4 text-5xl md:text-6xl font-bold tracking-tight text-slate-100">
            About Me
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Get to know more about my background, interests, and journey into software development.
          </p>
        </div>

        {/* Main About Content */}
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Left Column - Text */}
          <div className="md:col-span-2 space-y-6">
            {/* Intro Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-100">Hello, I'm Srabon!</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                I'm a Computer Science student at <span className="font-semibold text-slate-300">BRAC University</span> passionate about building modern web applications. I started learning web development through self-guided projects and have since developed a strong foundation in both frontend and backend technologies.
              </p>
              <p className="text-slate-400 leading-relaxed">
                What drives me is the intersection of design and functionality—creating applications that not only look great but perform efficiently and solve real problems. I believe in writing clean, maintainable code and continuously improving my craft through practice and learning.
              </p>
            </div>

            {/* What I Care About */}
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-100">What I Care About</h3>
              <ul className="space-y-3">
                {[
                  { icon: '✓', text: 'Clean, readable, and maintainable code' },
                  { icon: '✓', text: 'User-centered design and accessibility' },
                  { icon: '✓', text: 'Performance optimization and best practices' },
                  { icon: '✓', text: 'Solving real-world problems with technology' },
                  { icon: '✓', text: 'Continuous learning and growth' },
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 text-slate-400">
                    <span className="text-cyan-400 font-bold flex-shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Journey Section */}
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-100">My Learning Journey</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-cyan-400/50 pl-4">
                  <div className="font-semibold text-slate-100">Self-Taught Web Developer</div>
                  <div className="text-sm text-slate-500">Started learning React, Node.js, and MongoDB</div>
                  <p className="text-slate-400 mt-2 text-sm">Began with HTML/CSS fundamentals, progressed to JavaScript, then learned React for frontend and Node.js/Express for backend development.</p>
                </div>
                
                <div className="border-l-2 border-purple-400/50 pl-4">
                  <div className="font-semibold text-slate-100">Building Real Projects</div>
                  <div className="text-sm text-slate-500">Portfolio projects using MERN stack</div>
                  <p className="text-slate-400 mt-2 text-sm">Created multiple full-stack applications to solidify my understanding and apply concepts learned. Each project focused on solving specific problems.</p>
                </div>

                <div className="border-l-2 border-cyan-400/50 pl-4">
                  <div className="font-semibold text-slate-100">Continuous Improvement</div>
                  <div className="text-sm text-slate-500">Now focusing on best practices and advanced concepts</div>
                  <p className="text-slate-400 mt-2 text-sm">Currently deepening my understanding of performance optimization, testing, and software architecture. Always exploring new technologies and methodologies.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Facts Card */}
          <div className="md:col-span-1">
            <div className="sticky top-24 rounded-lg border border-slate-800 bg-slate-900/50 p-8">
              <h3 className="mb-6 text-lg font-bold text-slate-100">Quick Facts</h3>
              <div className="space-y-6">
                {[
                  { label: 'Name', value: 'Srabon Ahmed' },
                  { label: 'Location', value: 'Bangladesh' },
                  { label: 'Education', value: 'BS Computer Science' },
                  { label: 'University', value: 'BRAC University' },
                  { label: 'Year', value: '2024 - 2028' },
                  { label: 'Status', value: 'Available for Internships' },
                ].map((fact, index) => (
                  <div key={index}>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                      {fact.label}
                    </div>
                    <div className="text-sm font-medium text-slate-300">{fact.value}</div>
                  </div>
                ))}
              </div>

              {/* Hobby Section */}
              <div className="mt-8 border-t border-slate-700 pt-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  Outside of Code
                </div>
                <p className="text-sm text-slate-400">
                  I love traveling on my bike, exploring new places, meeting new people, and discovering different cultures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="border-t border-slate-800 pt-12">
          <h3 className="mb-6 text-xl font-bold text-slate-100">Let's Connect</h3>
          <p className="text-slate-400 mb-6">
            I'd love to hear from you. Feel free to reach out via any of these channels:
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a
              href="https://www.facebook.com/Srabon.Ahmed22/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-3 font-medium text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800/50 hover:text-white"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M13.5 9H16V6h-2.5C10.8 6 9 7.8 9 10.5V13H6v3h3v6h3v-6h3l1-3h-4v-2.5c0-.8.7-1.5 1.5-1.5Z" />
              </svg>
              Facebook
            </a>

            <a
              href="https://www.instagram.com/srabon_op/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-3 font-medium text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800/50 hover:text-white"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm4.75-2.75a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z" />
              </svg>
              Instagram
            </a>

            <a
              href="https://www.linkedin.com/in/sheikh-srabon-ahmed/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-3 font-medium text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800/50 hover:text-white"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
