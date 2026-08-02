import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { allConcepts } from "../../content/curriculum";
import type { Concept, Progress } from "../../types";

type Answer = { text: string; correct: boolean };

function buildAnswers(concept: Concept): Answer[] {
  const chapterPrefix = concept.id.slice(0, 2);
  const chapterConcepts = allConcepts.filter(
    (candidate) =>
      candidate.id !== concept.id && candidate.id.startsWith(chapterPrefix),
  );
  const currentIndex = allConcepts.findIndex((item) => item.id === concept.id);

  const distractors = chapterConcepts
    .map((candidate) => ({
      candidate,
      distance: Math.abs(
        allConcepts.findIndex((item) => item.id === candidate.id) - currentIndex,
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2)
    .map(({ candidate }) => ({ text: candidate.simple, correct: false }));

  const choices: Answer[] = [
    { text: concept.simple, correct: true },
    ...distractors,
  ];
  const seed = [...concept.id].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );

  return choices
    .map((answer, index) => ({
      answer,
      order: (seed * (index + 3) + index * 17) % 11,
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ answer }) => answer);
}

export function Practice({
  concept,
  progress,
  setProgress,
}: {
  concept: Concept;
  progress: Progress;
  setProgress: (p: Progress) => void;
}) {
  const [choice, setChoice] = useState<number>();
  const [checked, setChecked] = useState(false);
  const answers = useMemo(() => buildAnswers(concept), [concept]);
  const selectedAnswer = choice === undefined ? undefined : answers[choice];

  useEffect(() => {
    setChoice(undefined);
    setChecked(false);
  }, [concept.id]);

  const check = () => {
    if (!selectedAnswer) return;
    setChecked(true);
    const correct = selectedAnswer.correct;
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
        {answers.map((answer, index) => (
          <button
            key={`${concept.id}-${answer.text}`}
            onClick={() => {
              setChoice(index);
              setChecked(false);
            }}
            className={`${choice === index ? "picked" : ""} ${checked && choice === index ? (answer.correct ? "correct" : "wrong") : ""}`}
          >
            <b>{String.fromCharCode(65 + index)}</b>
            <span>{answer.text}</span>
            {checked &&
              choice === index &&
              (answer.correct ? <CheckCircle2 /> : <XCircle />)}
          </button>
        ))}
      </div>
      <div className="practice-foot">
        {checked ? (
          <p className={selectedAnswer?.correct ? "success" : "error"}>
            {selectedAnswer?.correct
              ? "Correct - the concept is ready for recall practice."
              : "Not quite. Compare the related concepts, then try again."}
          </p>
        ) : (
          <p>The alternatives are related ideas from the same chapter.</p>
        )}
        <button className="primary" onClick={check} disabled={choice === undefined}>
          Check answer <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
