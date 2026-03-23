function TechOrbit() {
  const orbitItems = [
    { name: 'React', short: '⚛', delay: '0s' },
    { name: 'Node.js', short: '🟢', delay: '-2.2s' },
    { name: 'MongoDB', short: '🍃', delay: '-4.4s' },
    { name: 'Express', short: 'Ex', delay: '-6.6s' },
    { name: 'Python', short: 'Py', delay: '-8.8s' },
  ];

  return (
    <div className="tech-orbit-wrapper">
      <div className="tech-orbit-center">
        <span className="text-[10px] uppercase tracking-[0.12em] text-cyan-300/80">Core Stack</span>
        <p className="mt-1 text-xs font-semibold text-slate-100">MERN + Python</p>
      </div>

      <div className="tech-orbit-ring" aria-hidden="true" />

      {orbitItems.map((item, index) => (
        <div
          key={item.name}
          className="tech-orbit-path"
          style={{ animationDelay: item.delay, transform: `rotate(${index * 72}deg)` }}
        >
          <div className="tech-orbit-item" title={item.name}>
            <span className="text-[0.78rem] leading-none">{item.short}</span>
            <span className="tech-orbit-tooltip">{item.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TechOrbit;
