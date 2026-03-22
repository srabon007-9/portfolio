import React, { useEffect, useMemo, useRef, useState } from 'react';

const PROMPT = 'srabon@portfolio:~$';

function sleepWithTracking(ms, timeoutRefs) {
  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(resolve, ms);
    timeoutRefs.current.push(timeoutId);
  });
}

function AnimatedOutput({ text, animate }) {
  const [visibleText, setVisibleText] = useState(animate ? '' : text);

  useEffect(() => {
    if (!animate) {
      setVisibleText(text);
      return undefined;
    }

    setVisibleText('');
    let index = 0;
    const intervalId = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(intervalId);
      }
    }, 14);

    return () => window.clearInterval(intervalId);
  }, [text, animate]);

  return <span>{visibleText}</span>;
}

function TerminalSection() {
  const [history, setHistory] = useState([
    {
      id: 1,
      type: 'output',
      text: 'Boot sequence complete. Type "help" to list available commands.',
      animate: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [commandMemory, setCommandMemory] = useState([]);
  const [, setMemoryIndex] = useState(-1);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const timeoutRefs = useRef([]);

  const commandSuggestions = useMemo(
    () => [
      'help',
      'about',
      'skills',
      'projects',
      'contact',
      'hack',
      'matrix',
      'joke',
      'mission',
      'clear',
    ],
    []
  );

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutRefs.current = [];
    };
  }, []);

  const appendLine = (line) => {
    setHistory((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        animate: true,
        ...line,
      },
    ]);
  };

  const runHackSequence = async () => {
    setIsBusy(true);
    const lines = [
      'Accessing mainframe...',
      'Bypassing firewall...',
      'Decrypting secure channel...',
      'Access granted!',
    ];

    for (const line of lines) {
      appendLine({ type: 'output', text: line });
      await sleepWithTracking(700, timeoutRefs);
    }

    setIsBusy(false);
  };

  const runMatrixSequence = async () => {
    setIsBusy(true);
    const lines = [
      'Initializing quantum rendering engine...',
      'Spawning neon matrix stream █▓▒░ ...',
      'Signal lock acquired at 99.7%',
      'Future mode enabled. Welcome, operator.',
    ];

    for (const line of lines) {
      appendLine({ type: 'output', text: line });
      await sleepWithTracking(520, timeoutRefs);
    }

    setIsBusy(false);
  };

  const executeCommand = async (rawCommand) => {
    const command = rawCommand.toLowerCase();

    switch (command) {
      case 'help':
        appendLine({
          type: 'output',
          text: 'Available commands: help, about, skills, projects, contact, hack, matrix, joke, mission, clear',
        });
        break;
      case 'about':
        appendLine({
          type: 'output',
          text: 'I am a Computer Science student building modern apps with the MERN stack and currently learning DSA deeply.',
        });
        break;
      case 'skills':
        appendLine({
          type: 'output',
          text: 'Tech stack: React, Node.js, Express, MongoDB, Python',
        });
        break;
      case 'projects':
        appendLine({ type: 'output', text: 'Projects coming soon... Stay tuned for fresh builds.' });
        break;
      case 'contact':
        appendLine({
          type: 'output',
          text: 'Email: srabonahmed2002@gmail.com | GitHub: https://github.com/srabon007-9',
        });
        break;
      case 'hack':
        await runHackSequence();
        break;
      case 'matrix':
        await runMatrixSequence();
        break;
      case 'joke':
        appendLine({
          type: 'output',
          text: 'Why do developers love dark mode? Because light attracts bugs. 🐞',
        });
        break;
      case 'mission':
        appendLine({
          type: 'output',
          text: 'Mission: Build reliable, accessible products. Current focus: MERN architecture, DSA consistency, and backend systems design.',
        });
        break;
      case 'clear':
        setHistory([]);
        break;
      default:
        appendLine({
          type: 'error',
          text: `command not found: ${rawCommand}. Type "help" to see available commands.`,
        });
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const command = input.trim();

    if (!command || isBusy) return;

    appendLine({ type: 'command', text: command, animate: false });
    setCommandMemory((prev) => [...prev, command]);
    setMemoryIndex(-1);
    setInput('');

    await executeCommand(command);
  };

  const handleKeyDown = (event) => {
    if (!commandMemory.length) return;

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setMemoryIndex((prev) => {
        const nextIndex = prev < 0 ? commandMemory.length - 1 : Math.max(prev - 1, 0);
        setInput(commandMemory[nextIndex]);
        return nextIndex;
      });
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setMemoryIndex((prev) => {
        if (prev <= 0) {
          setInput('');
          return -1;
        }
        const nextIndex = prev - 1;
        setInput(commandMemory[nextIndex]);
        return nextIndex;
      });
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const firstMatch = commandSuggestions.find((suggestion) => suggestion.startsWith(input.trim()));
      if (firstMatch) {
        setInput(firstMatch);
      }
    }
  };

  return (
    <div
      className="mx-auto w-full max-w-6xl"
      onClick={() => inputRef.current?.focus()}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && document.activeElement !== inputRef.current) {
          inputRef.current?.focus();
        }
      }}
      role="presentation"
    >
      <div className="overflow-hidden rounded-2xl border border-emerald-400/30 bg-black/85 shadow-[0_0_35px_rgba(16,185,129,0.18)]">
        <div className="flex items-center justify-between border-b border-emerald-500/20 bg-emerald-950/20 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <p className="font-mono text-xs text-emerald-300/80">terminal://portfolio-shell</p>
        </div>

        <div
          ref={scrollRef}
          className="h-[360px] overflow-y-auto px-4 py-4 font-mono text-sm text-emerald-300 md:h-[420px]"
        >
          {history.map((line) => (
            <div key={line.id} className="mb-2 break-words">
              {line.type === 'command' ? (
                <p>
                  <span className="text-emerald-200">{PROMPT}</span> <span>{line.text}</span>
                </p>
              ) : (
                <p className={line.type === 'error' ? 'text-rose-300' : 'text-emerald-300'}>
                  <AnimatedOutput text={line.text} animate={line.animate} />
                </p>
              )}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
            <span className="shrink-0 text-emerald-200">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck={false}
              disabled={isBusy}
              className="w-full bg-transparent text-emerald-300 outline-none placeholder:text-emerald-500/50"
              placeholder={isBusy ? 'running hack sequence...' : 'type a command'}
            />
            <span className={`h-4 w-2 rounded-sm bg-emerald-300 ${isFocused ? 'animate-pulse' : 'opacity-0'}`} />
          </form>
        </div>

        <div className="border-t border-emerald-500/20 px-4 py-3">
          <p className="font-mono text-xs text-emerald-400/80">
            Suggestions: {commandSuggestions.join(' · ')} (Tab to autocomplete)
          </p>
        </div>
      </div>
    </div>
  );
}

export default TerminalSection;
