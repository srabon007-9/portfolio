import SectionReveal from '../components/SectionReveal';

const infoCards = [
  { label: 'Email', value: 'srabonahmed2002@gmail.com' },
  { label: 'University', value: 'Brac University' },
  { label: 'Program', value: 'Computer Science' },
  { label: 'Favourite Food', value: 'Biriyani' },
  { label: 'Favourite Hobby', value: 'Travelling' },
  { label: 'Tech Stack', value: 'MERN Stack' },
  { label: 'Current Focus', value: 'Data Structures & Algorithms' },
];

function About() {
  return (
    <div className="min-h-screen px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="mb-14 text-center">
          <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" aria-hidden="true" />
          <h1 className="mb-3 text-5xl font-bold tracking-tight text-slate-100 md:text-6xl">Srabon</h1>
          <p className="text-base text-slate-400 md:text-lg">
            MERN Stack Developer | Computer Science Student
          </p>
        </SectionReveal>

        <SectionReveal className="mb-14">
          <div className="glass-card mx-auto max-w-3xl rounded-2xl border border-slate-700/70 p-8 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-400/30 bg-slate-900/70 text-2xl font-bold text-cyan-300">
                SA
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-100">Srabon</h2>
                <p className="text-sm text-slate-400">Program: Computer Science</p>
                <p className="text-sm text-slate-400">University: Brac University</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infoCards.map((item) => (
              <div
                key={item.label}
                data-cursor="hover"
                className="glass-card rounded-xl border border-slate-700/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {item.label}
                </p>
                <p className="text-base font-semibold text-slate-100">{item.value}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}

export default About;
