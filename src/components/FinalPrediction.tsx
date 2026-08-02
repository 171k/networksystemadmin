import {
  Brain,
  ChevronDown,
  CircleAlert,
  Crosshair,
  Eye,
  FileQuestion,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  predictedQuestions,
  wildcardPredictions,
} from "../content/examPredictions";

const chapterColors: Record<number, string> = {
  5: "#1e63d5",
  6: "#7a3ee6",
  7: "#d97706",
  8: "#07866d",
};

export function FinalPrediction() {
  return (
    <div className="prediction-page">
      <section className="prediction-hero">
        <div>
          <span className="kicker">PATTERN-BASED MOCK PAPER</span>
          <h1>Final Exam Prediction</h1>
          <p>
            The most defensible question forecast from February 2025, July
            2025 and February 2026 - with a complete answer plan for each one.
          </p>
        </div>
        <div className="prediction-orbit" aria-hidden="true">
          <Sparkles />
          <i>5</i><i>6</i><i>7</i><i>8</i>
        </div>
      </section>

      <div className="prediction-warning">
        <CircleAlert />
        <p>
          <strong>This is a forecast, not a leaked paper.</strong>
          Exact wording can change. Use it to prioritise recall, then still
          understand the nearby concepts.
        </p>
      </div>

      <section className="prediction-pattern">
        <div className="prediction-section-head">
          <span className="kicker">THE STRONGEST PATTERN</span>
          <h2>The Part B chapter order has stayed consistent</h2>
        </div>
        <div className="prediction-blueprint">
          {predictedQuestions.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{ "--prediction-color": chapterColors[item.chapter] } as React.CSSProperties}
            >
              <span>{item.question}</span>
              <b>Chapter {item.chapter}</b>
              <small>{item.title} - about {item.marks} marks</small>
            </a>
          ))}
        </div>
      </section>

      <section className="prediction-how">
        <div><i>1</i><span><b>Attempt</b>Write points from memory.</span></div>
        <div><i>2</i><span><b>Count</b>Match the number of developed points to the marks.</span></div>
        <div><i>3</i><span><b>Reveal</b>Compare with the model and steal its precise wording.</span></div>
      </section>

      <section className="predicted-paper">
        <div className="prediction-section-head">
          <span className="kicker">PREDICTED PART B</span>
          <h2>Your highest-priority mock paper</h2>
          <p>Do these four question groups under timed conditions.</p>
        </div>
        <div className="prediction-question-list">
          {predictedQuestions.map((group) => (
            <article
              id={group.id}
              key={group.id}
              className="prediction-question"
              style={{ "--prediction-color": chapterColors[group.chapter] } as React.CSSProperties}
            >
              <header>
                <div className="prediction-number">{group.question.replace("Question ", "Q")}</div>
                <div>
                  <span>CHAPTER {group.chapter}</span>
                  <h3>{group.title}</h3>
                </div>
                <div className={`confidence ${group.confidence.toLowerCase().replace(" ", "-")}`}>
                  <TrendingUp /> {group.confidence}
                </div>
                <strong>{group.marks} marks</strong>
              </header>
              <div className="prediction-reason">
                <Crosshair />
                <p><b>Why this is likely</b>{group.reason}</p>
              </div>
              <div className="prediction-parts">
                {group.subquestions.map((question) => (
                  <details key={question.label}>
                    <summary>
                      <span>{question.label}</span>
                      <div>
                        <b>{question.prompt}</b>
                        <small>{question.command}</small>
                      </div>
                      <em>{question.marks} marks</em>
                      <ChevronDown />
                    </summary>
                    <div className="prediction-answer">
                      <div className="prediction-mark-plan">
                        <Brain />
                        <p><b>Mark plan</b>{question.markPlan}</p>
                      </div>
                      <div className="prediction-model">
                        <span><Eye /> MODEL ANSWER</span>
                        <ol>
                          {question.answer.map((point) => <li key={point}>{point}</li>)}
                        </ol>
                        {question.diagram && <pre>{question.diagram.join("\n")}</pre>}
                      </div>
                      {question.memory && (
                        <p className="prediction-memory"><Sparkles /> <b>Memory:</b> {question.memory}</p>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="prediction-wildcards">
        <div className="prediction-section-head">
          <span className="kicker">DO NOT IGNORE THESE</span>
          <h2>Wildcard questions</h2>
          <p>Important structured lists that have not yet been directly tested in recent Part B papers.</p>
        </div>
        <div className="wildcard-grid">
          {wildcardPredictions.map((item) => (
            <details
              key={`${item.chapter}-${item.topic}`}
              style={{ "--prediction-color": chapterColors[item.chapter] } as React.CSSProperties}
            >
              <summary>
                <span>CH {item.chapter}</span>
                <div><b>{item.topic}</b><small>{item.prompt}</small></div>
                <ChevronDown />
              </summary>
              <div>
                <strong><FileQuestion /> Answer</strong>
                <p>{item.answer}</p>
                <small><b>Why it may appear:</b> {item.reason}</small>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
