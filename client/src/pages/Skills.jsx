import { motion } from 'framer-motion';

// Skills page - Showcase all technical skills
function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      color: 'from-blue-600 to-cyan-600',
      skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Tailwind CSS', 'Responsive Design'],
    },
    {
      title: 'Backend',
      icon: '⚙️',
      color: 'from-green-600 to-emerald-600',
      skills: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Middleware', 'Server-side Logic'],
    },
    {
      title: 'Databases',
      icon: '💾',
      color: 'from-purple-600 to-pink-600',
      skills: ['MongoDB', 'Mongoose', 'Data Modeling', 'Query Optimization', 'Indexing'],
    },
    {
      title: 'Programming Languages',
      icon: '💻',
      color: 'from-orange-600 to-red-600',
      skills: ['JavaScript', 'Python', 'C', 'C++', 'Java'],
    },
    {
      title: 'Tools & Technologies',
      icon: '🛠️',
      color: 'from-slate-600 to-gray-600',
      skills: ['Git / GitHub', 'VS Code', 'npm / yarn', 'Vercel', 'REST Client', 'Terminal'],
    },
    {
      title: 'Soft Skills',
      icon: '🌟',
      color: 'from-yellow-600 to-orange-600',
      skills: ['Problem Solving', 'Code Clean Code', 'Communication', 'Self-learning', 'Attention to Detail'],
    },
  ];

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl md:text-6xl font-bold tracking-tight text-slate-100">
            Skills & Technologies
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive overview of the technologies and skills I work with. Constantly learning and expanding my toolkit.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-slate-700 hover:bg-slate-900/80"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 -z-10 rounded-xl opacity-0 blur-lg transition-opacity group-hover:opacity-20 bg-gradient-to-br ${category.color}`} />

              {/* Icon and Title */}
              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-2xl font-bold text-slate-100">{category.title}</h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="rounded-lg border border-slate-700/50 bg-slate-950/50 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800/50"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency Section */}
        <div className="mt-20 rounded-xl border border-slate-800 bg-slate-900/50 p-12">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-3xl font-bold text-slate-100">Proficiency Levels</h2>
            <p className="text-sm text-slate-400">Tip: drag each row left/right for a movable effect</p>
          </div>
          
          <div className="space-y-8">
            {[
              { skill: 'JavaScript & React', level: 90, color: 'from-yellow-500 to-orange-500' },
              { skill: 'Node.js & Express', level: 85, color: 'from-green-500 to-emerald-500' },
              { skill: 'MongoDB & Databases', level: 80, color: 'from-purple-500 to-pink-500' },
              { skill: 'HTML, CSS & Tailwind', level: 90, color: 'from-blue-500 to-cyan-500' },
              { skill: 'Problem Solving', level: 85, color: 'from-indigo-500 to-purple-500' },
            ].map((item, index) => (
              <motion.div
                key={index}
                drag="x"
                dragConstraints={{ left: -24, right: 24 }}
                dragElastic={0.18}
                whileHover={{ y: -2 }}
                whileDrag={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <div className="mb-2 flex justify-between">
                  <span className="font-semibold text-slate-300">{item.skill}</span>
                  <span className="text-sm text-slate-500">{item.level}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    className={`relative h-full rounded-full bg-gradient-to-r ${item.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
                  >
                    <motion.span
                      className="absolute inset-y-0 w-10 bg-white/20 blur-[1px]"
                      animate={{ x: ['-120%', '340%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: index * 0.15 }}
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learning Section */}
        <div className="mt-20">
          <h2 className="mb-8 text-3xl font-bold text-slate-100">Currently Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { tech: 'TypeScript', description: 'Static typing for JavaScript, improving code quality and maintainability.' },
              { tech: 'Advanced React', description: 'Hooks, Context API, and performance optimization techniques.' },
              { tech: 'Testing', description: 'Unit testing with Jest, integration testing, and best practices.' },
              { tech: 'System Design', description: 'Scalable architecture and performance optimization fundamentals.' },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-slate-700/50 bg-slate-950/50 p-6">
                <h4 className="mb-2 font-semibold text-slate-100">{item.tech}</h4>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
