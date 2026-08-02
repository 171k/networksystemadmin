import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  RotateCcw,
  Target,
  Trophy,
  X,
} from "lucide-react";
import { tykTests, type TYKTest } from "../content/tykTests";

const chapterColors: Record<number, string> = {
  5: "#1e63d5",
  6: "#7a3ee6",
  7: "#d97706",
  8: "#07866d",
};

export function TYKTests() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const activeTest = tykTests.find((test) => test.id === activeId);

  const startTest = (test: TYKTest) => {
    setActiveId(test.id);
    setQuestionIndex(0);
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const returnToTests = () => {
    setActiveId(null);
    setQuestionIndex(0);
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!activeTest) return <TestLibrary startTest={startTest} />;
  if (submitted)
    return (
      <TestResults
        test={activeTest}
        answers={answers}
        retry={() => startTest(activeTest)}
        back={returnToTests}
      />
    );

  const question = activeTest.questions[questionIndex];
  const answered = Object.keys(answers).length;
  const allAnswered = answered === activeTest.questions.length;

  return (
    <div className="tyk-test-page">
      <div className="tyk-test-top">
        <button onClick={returnToTests}><ArrowLeft /> All tests</button>
        <div>
          <span>TEST {activeTest.number}</span>
          <h1>{activeTest.title}</h1>
        </div>
        <aside><Clock3 /> Suggested: 12 min</aside>
      </div>

      <div className="tyk-test-progress">
        <div><i style={{ width: `${(answered / 10) * 100}%` }} /></div>
        <span>{answered} of 10 answered</span>
      </div>

      <nav className="tyk-question-nav" aria-label="Test questions">
        {activeTest.questions.map((item, index) => (
          <button
            key={item.id}
            aria-label={`Question ${index + 1}${answers[item.id] ? ", answered" : ""}`}
            className={`${index === questionIndex ? "current" : ""} ${answers[item.id] ? "answered" : ""}`}
            onClick={() => setQuestionIndex(index)}
          >
            {answers[item.id] ? <Check /> : index + 1}
          </button>
        ))}
      </nav>

      <section
        className="tyk-question-card"
        style={{ "--question-color": chapterColors[question.chapter] } as React.CSSProperties}
      >
        <header>
          <div>
            <span>QUESTION {questionIndex + 1} OF 10</span>
            <b>CHAPTER {question.chapter}</b>
          </div>
          <em>{question.kind}</em>
        </header>
        <h2>{question.prompt}</h2>
        <div className="tyk-options">
          {question.options.map((option, index) => {
            const selected = answers[question.id] === option;
            return (
              <button
                key={option}
                className={selected ? "selected" : ""}
                aria-pressed={selected}
                onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
              >
                <i>{String.fromCharCode(65 + index)}</i>
                <span>{option}</span>
                <b>{selected && <Check />}</b>
              </button>
            );
          })}
        </div>
      </section>

      <div className="tyk-test-controls">
        <button
          disabled={questionIndex === 0}
          onClick={() => setQuestionIndex((index) => index - 1)}
        ><ArrowLeft /> Previous</button>
        {questionIndex < 9 ? (
          <button
            className="primary"
            onClick={() => setQuestionIndex((index) => index + 1)}
          >Next question <ArrowRight /></button>
        ) : (
          <button
            className="primary submit-test"
            disabled={!allAnswered}
            title={allAnswered ? "Submit test" : "Answer every question before submitting"}
            onClick={() => {
              setSubmitted(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >Submit test <CheckCircle2 /></button>
        )}
      </div>
      {!allAnswered && questionIndex === 9 && (
        <p className="tyk-unanswered">Answer all 10 questions before submitting. Use the numbered buttons to find gaps.</p>
      )}
    </div>
  );
}

function TestLibrary({ startTest }: { startTest: (test: TYKTest) => void }) {
  return (
    <div className="tyk-library">
      <section className="tyk-hero">
        <div>
          <span className="kicker">TEST YOUR KNOWLEDGE - MCQ</span>
          <h1>Five tests. Fifty chances to retrieve.</h1>
          <p>
            These questions test both exact lecture recall and whether you can
            choose the right idea inside an exam scenario.
          </p>
        </div>
        <div className="tyk-hero-score">
          <Brain />
          <strong>50</strong>
          <span>questions across Chapters 5-8</span>
        </div>
      </section>

      <section className="tyk-mode-strip">
        <div><Target /><span><b>Recall</b>Terms, lists and sequences</span></div>
        <div><CircleHelp /><span><b>Understand</b>Close comparisons and traps</span></div>
        <div><Trophy /><span><b>Apply</b>Realistic exam scenarios</span></div>
      </section>

      <div className="tyk-library-head">
        <div><span className="kicker">CHOOSE A TEST</span><h2>Work from foundations to final challenge</h2></div>
        <small>10 questions each</small>
      </div>
      <div className="tyk-test-grid">
        {tykTests.map((test) => {
          const chapterCounts = [5, 6, 7, 8].map((chapter) => ({
            chapter,
            count: test.questions.filter((question) => question.chapter === chapter).length,
          }));
          return (
            <article key={test.id}>
              <header>
                <i>0{test.number}</i>
                <span className={`tyk-difficulty ${test.difficulty.toLowerCase()}`}>{test.difficulty}</span>
              </header>
              <h3>{test.title}</h3>
              <p>{test.subtitle}</p>
              <div className="tyk-chapter-mix">
                {chapterCounts.map(({ chapter, count }) => (
                  <span key={chapter} style={{ "--mix-color": chapterColors[chapter] } as React.CSSProperties}>
                    Ch{chapter} <b>{count}</b>
                  </span>
                ))}
              </div>
              <button onClick={() => startTest(test)}>Start test <ChevronRight /></button>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function TestResults({
  test,
  answers,
  retry,
  back,
}: {
  test: TYKTest;
  answers: Record<string, string>;
  retry: () => void;
  back: () => void;
}) {
  const correct = test.questions.filter((question) => answers[question.id] === question.answer).length;
  const percentage = correct * 10;
  const chapterScores = useMemo(
    () =>
      [5, 6, 7, 8].map((chapter) => {
        const questions = test.questions.filter((question) => question.chapter === chapter);
        const score = questions.filter((question) => answers[question.id] === question.answer).length;
        return { chapter, score, total: questions.length };
      }),
    [answers, test],
  );
  const message = percentage >= 80
    ? "Strong recall. Move to the next test."
    : percentage >= 60
      ? "You understand the core. Review the misses once."
      : "Good diagnostic. Relearn the missed concepts, then retry.";

  return (
    <div className="tyk-results-page">
      <section className="tyk-result-hero">
        <div className="tyk-score-ring" style={{ "--score": `${percentage * 3.6}deg` } as React.CSSProperties}>
          <div><strong>{percentage}%</strong><span>{correct}/10 correct</span></div>
        </div>
        <div>
          <span className="kicker">TEST {test.number} COMPLETE</span>
          <h1>{test.title}</h1>
          <p>{message}</p>
          <div className="tyk-result-actions">
            <button onClick={retry}><RotateCcw /> Retake test</button>
            <button onClick={back}>All tests <ChevronRight /></button>
          </div>
        </div>
      </section>

      <section className="tyk-breakdown">
        <div><span className="kicker">CHAPTER BREAKDOWN</span><h2>Where the marks came from</h2></div>
        <div className="tyk-breakdown-grid">
          {chapterScores.map((item) => (
            <article key={item.chapter} style={{ "--breakdown-color": chapterColors[item.chapter] } as React.CSSProperties}>
              <span>CHAPTER {item.chapter}</span>
              <strong>{item.score}/{item.total}</strong>
              <div><i style={{ width: `${item.total ? (item.score / item.total) * 100 : 0}%` }} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="tyk-review">
        <div className="tyk-library-head">
          <div><span className="kicker">ANSWER REVIEW</span><h2>Correct the wording while it is fresh</h2></div>
          <small>{10 - correct} to review</small>
        </div>
        <div className="tyk-review-list">
          {test.questions.map((question, index) => {
            const isCorrect = answers[question.id] === question.answer;
            return (
              <details key={question.id} className={isCorrect ? "correct" : "incorrect"} open={!isCorrect}>
                <summary>
                  <i>{isCorrect ? <Check /> : <X />}</i>
                  <div><span>Q{index + 1} - CHAPTER {question.chapter}</span><b>{question.prompt}</b></div>
                  <em>{isCorrect ? "Correct" : "Review"}</em>
                  <ChevronRight />
                </summary>
                <div>
                  {!isCorrect && <p className="your-answer"><b>Your answer</b>{answers[question.id]}</p>}
                  <p className="correct-answer"><b>Correct answer</b>{question.answer}</p>
                  <p className="answer-explanation"><b>Why</b>{question.explanation}</p>
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </div>
  );
}
