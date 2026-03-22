import { useEffect, useMemo, useState } from 'react';

function LiveCodePreview() {
  const codeObject = useMemo(
    () => `const developer = {\n  name: "Srabon Ahmed",\n  role: "Frontend Developer",\n  focus: ["React", "Node.js", "UX"],\n  learning: ["DSA", "System Design"],\n  availableFor: "Internships & freelance"\n};`,
    []
  );

  const [typedCode, setTypedCode] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      setTypedCode(codeObject.slice(0, index + 1));
      index += 1;

      if (index >= codeObject.length) {
        window.clearInterval(timer);
      }
    }, 24);

    return () => window.clearInterval(timer);
  }, [codeObject]);

  const lineRenderer = (line) => {
    if (line.startsWith('const')) {
      return (
        <span>
          <span className="text-purple-300">const</span>{' '}
          <span className="text-cyan-300">developer</span>{' '}
          <span className="text-slate-100">= {'{'}</span>
        </span>
      );
    }

    return <span className="text-slate-300">{line}</span>;
  };

  const lines = typedCode.split('\n');

  return (
    <div className="glass-card overflow-hidden rounded-2xl border border-cyan-400/20">
      <div className="flex items-center gap-2 border-b border-slate-700/70 bg-slate-900/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-xs text-slate-400">profile.js</span>
      </div>

      <div className="min-h-[220px] bg-slate-950/70 p-4 font-mono text-sm leading-7">
        {lines.map((line, index) => (
          <div key={`${line}-${index}`} className="flex gap-4">
            <span className="w-6 select-none text-right text-slate-600">{index + 1}</span>
            <span>{lineRenderer(line, index)}</span>
          </div>
        ))}
        <span className="typing-caret" aria-hidden="true" />
      </div>
    </div>
  );
}

export default LiveCodePreview;
