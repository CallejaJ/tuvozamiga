"use client";
import { useEffect, useState } from "react";

interface TypewriterWordsProps {
  words: string[];
  className?: string;
}

export default function TypewriterWords({
  words,
  className = "",
}: TypewriterWordsProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let delay = deleting ? 40 : 90;
    if (!deleting && text === word) delay = 2000; // pausa con la palabra completa
    else if (deleting && text === "") delay = 400;

    const id = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(id);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className={`typing-caret ${className}`} aria-live="polite">
      {text}
    </span>
  );
}
