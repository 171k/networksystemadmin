import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import type { Concept, Progress } from "../../types";

export function Practice({
  concept,
  progress,
  setProgress,
}: {
  concept: Concept;
  progress: Progress;
  setProgress: (p: Progress) => void;
}) {
  const [choice, setChoice] = useState<string>();
  const [checked, setChecked] = useState(false);
  const answers = [
    concept.simple,
    "A decorative visual with no operational meaning",
    "A process that always requires an external database",
  ];
  const check = () => {
    if (!choice) return;
    setChecked(true);
    const correct = choice === concept.simple;
    const old = progress.attempts[concept.id] || { correct: 0, total: 0 };
    setProgress({
      ...progress,
      attempts: {
        ...progress.attempts,
        [concept.id]: {
          correct: old.correct + (correct ? 1 : 0),
          total: old.total + 1,
        },
      },
      weak: correct
        ? progress.weak.filter((x) => x !== concept.id)
        : [...new Set([...progress.weak, concept.id])],
      mistakes: correct
        ? progress.mistakes
        : [
            ...progress.mistakes.filter((x) => x.id !== concept.id),
            {
              id: concept.id,
              prompt: `Explain ${concept.title}`,
              answer: concept.simple,
            },
          ],
    });
  };
  return (
    <section className="practice-card">
      <span className="kicker">KNOWLEDGE CHECK</span>
      <h3>Which statement best explains {concept.title.toLowerCase()}?</h3>
      <div className="options">
        {answers.map((a, i) => (
          <button
            key={a}
            onClick={() => {
              setChoice(a);
              setChecked(false);
            }}
            className={`${choice === a ? "picked" : ""} ${checked && choice === a ? (i === 0 ? "correct" : "wrong") : ""}`}
          >
            <b>{String.fromCharCode(65 + i)}</b>
            <span>{a}</span>
            {checked &&
              choice === a &&
              (i === 0 ? <CheckCircle2 /> : <XCircle />)}
          </button>
        ))}
      </div>
      <div className="practice-foot">
        {checked ? (
          <p className={choice === concept.simple ? "success" : "error"}>
            {choice === concept.simple
              ? "Correct — the concept is ready for recall practice."
              : "Not quite. Review the simple explanation and try again."}
          </p>
        ) : (
          <p>Select the most accurate answer.</p>
        )}
        <button className="primary" onClick={check}>
          Check answer <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
