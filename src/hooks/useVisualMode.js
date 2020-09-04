import React, { useState } from 'react';

export function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode) {
    setMode(mode);
    setHistory(mode);
  }

  function back() {
    setMode(history);
  }

  return {
    mode,
    transition,
    back
  }
}