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
            I'm a passionate full-stack developer with expertise in the MERN stack (MongoDB, Express,
            React, Node.js). I love building web applications that are not only functional but also
            beautiful and user-friendly.
          </p>
          <p className="leading-relaxed text-slate-400">
            When I'm not coding, you can find me learning new technologies, contributing to open-source
            projects, or exploring the great outdoors.
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
      </div>
    </div>
  );
}

export default About;
