import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  AlertTriangle,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileQuestion,
  Lightbulb,
  RotateCcw,
  Target,
  ThumbsUp,
  Trophy,
} from "lucide-react";
import {
  examChapterGuides,
  examMcqs,
  examPaperGroups,
  recallCards,
  sequenceGames,
} from "../content/examFocus";

const papers = ["All papers", "February 2025", "July 2025", "February 2026"];

export function ExamFocus() {
  const [chapter, setChapter] = useState(5);
  const [paper, setPaper] = useState("All papers");
  const guide = examChapterGuides.find((item) => item.chapter === chapter)!;
  const groups = useMemo(
    () =>
      examPaperGroups.filter(
        (group) =>
          group.chapter === chapter &&
          (paper === "All papers" || group.paper === paper),
      ),
    [chapter, paper],
  );
  const mcqs = examMcqs.filter(
    (item) =>
      item.chapter === chapter &&
      (paper === "All papers" || item.paper === paper),
  );

  const chooseChapter = (value: number) => {
    setChapter(value);
    setPaper("All papers");
  };

  return (
    <div className="exam-focus-page" style={{ "--exam-color": guide.color } as React.CSSProperties}>
      <section className="exam-hero">
        <div>
          <span className="kicker">PAST-PAPER GUIDED STUDY</span>
          <h1>Exam focus</h1>
          <p>
            Learn the part that earns marks: remember the pattern, say it in
            lecture language, then apply it to the scenario.
          </p>
        </div>
        <div className="seventy-rule">
          <Brain />
          <div>
            <strong>The 70% rule</strong>
            <span>Answer the checkpoint without notes, then move on.</span>
          </div>
        </div>
      </section>

      <nav className="exam-chapter-tabs" aria-label="Exam chapter">
        {examChapterGuides.map((item) => (
          <button
            key={item.chapter}
            className={chapter === item.chapter ? "active" : ""}
            style={{ "--tab-color": item.color } as React.CSSProperties}
            onClick={() => chooseChapter(item.chapter)}
          >
            <b>0{item.chapter}</b>
            <span>{item.title}</span>
          </button>
        ))}
      </nav>

      <section className="exam-overview">
        <div>
          <span className="kicker">CHAPTER {guide.chapter} - BIG PICTURE</span>
          <h2>{guide.bigPicture}</h2>
          <div className="exam-flow" aria-label="Chapter memory flow">
            {guide.flow.map((step, index) => (
              <span key={step}>
                <b>{step}</b>
                {index < guide.flow.length - 1 && <ArrowRight />}
              </span>
            ))}
          </div>
        </div>
        <aside>
          <span className="kicker">WHAT THE PAPERS REPEAT</span>
          {guide.frequency.map((item) => (
            <p key={item}>
              <Target /> {item}
            </p>
          ))}
        </aside>
      </section>

      <section className="exam-section">
        <div className="exam-section-head">
          <div>
            <span className="kicker">COMPRESSED MODE</span>
            <h2>What you need to remember</h2>
          </div>
          <NavLink to={`/module/${guide.moduleId}`}>
            Open full chapter <BookOpen />
          </NavLink>
        </div>
        <div className="memory-grid">
          {guide.memory.map((block, index) => (
            <article key={block.title}>
              <header>
                <i>{index + 1}</i>
                <h3>{block.title}</h3>
              </header>
              <p>{block.remember}</p>
              <div className="exam-say">
                <strong>Say this in the exam</strong>
                <p>{block.examLine}</p>
              </div>
              <div className="memory-hook">
                <Lightbulb />
                <span>
                  <b>Memory:</b> {block.hook}
                </span>
              </div>
              <div className="common-trap">
                <AlertTriangle />
                <span><b>Common trap:</b> {block.trap}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="checkpoint-card">
        <div>
          <span className="kicker">QUICK CHECKPOINT</span>
          <h2>No peeking, bro.</h2>
          <p>If you can answer at least 70%, continue to the past papers.</p>
        </div>
        <ol>
          {guide.checkpoint.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>

      <section className="exam-section recall-lab-section">
        <div className="exam-section-head">
          <div>
            <span className="kicker">ACTIVE RECALL ARCADE</span>
            <h2>Make your brain retrieve it</h2>
            <p>Short rounds, immediate correction and exact exam wording - just like your study chat.</p>
          </div>
        </div>
        <div className="recall-games">
          <RecallTrainer chapter={chapter} />
          <SequenceTrainer chapter={chapter} />
        </div>
      </section>

      <section className="exam-section pyq-section">
        <div className="exam-section-head stacked-mobile">
          <div>
            <span className="kicker">ANSWER LAB</span>
            <h2>Past-year questions, mark by mark</h2>
            <p>Attempt each question first. Open the model only after you commit to an answer.</p>
          </div>
          <div className="paper-filter" aria-label="Filter by paper">
            {papers.map((item) => (
              <button
                key={item}
                className={paper === item ? "active" : ""}
                onClick={() => setPaper(item)}
              >
                {item.replace("February ", "Feb ")}
              </button>
            ))}
          </div>
        </div>

        <div className="paper-groups">
          {groups.map((group) => (
            <article className="paper-group" key={group.id}>
              <header>
                <div>
                  <span>{group.paper}</span>
                  <h3>{group.question}</h3>
                </div>
                <small>Paper p. {group.page}</small>
              </header>
              <div className="paper-subquestions">
                {group.subquestions.map((subquestion) => (
                  <details key={subquestion.label}>
                    <summary>
                      <span className="question-label">{subquestion.label}</span>
                      <span className="question-copy">
                        <b>{subquestion.prompt}</b>
                        <small>{subquestion.command}</small>
                      </span>
                      <em>{subquestion.marks} marks</em>
                      <ChevronDown />
                    </summary>
                    <div className="worked-answer">
                      <div className="mark-plan">
                        <Target />
                        <p>
                          <strong>How to collect the marks</strong>
                          {subquestion.markPlan}
                        </p>
                      </div>
                      <div className="model-answer">
                        <span className="kicker">MODEL ANSWER</span>
                        <ol>
                          {subquestion.answer.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ol>
                        {subquestion.diagram && (
                          <pre>{subquestion.diagram.join("\n")}</pre>
                        )}
                      </div>
                      {subquestion.memory && (
                        <div className="memory-hook compact">
                          <Lightbulb />
                          <span>
                            <b>Memory:</b> {subquestion.memory}
                          </span>
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </article>
          ))}
          {!groups.length && (
            <div className="empty-paper">
              <FileQuestion />
              <p>No Part B question for this chapter in that paper.</p>
            </div>
          )}
        </div>
      </section>

      {!!mcqs.length && (
        <section className="exam-section mcq-section">
          <div className="exam-section-head">
            <div>
              <span className="kicker">PART A QUICK WINS</span>
              <h2>Relevant MCQ patterns</h2>
            </div>
          </div>
          <div className="mcq-grid">
            {mcqs.map((item) => (
              <details key={item.id}>
                <summary>
                  <span>{item.paper} - Q{item.number}</span>
                  <b>{item.prompt}</b>
                  <ChevronDown />
                </summary>
                <div>
                  <strong>
                    <CheckCircle2 /> {item.answer}
                  </strong>
                  <p>{item.reason}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      <p className="model-note">
        Model answers use the lecture terminology. Mark splits are a practical
        answering guide inferred from the stated mark totals.
      </p>
    </div>
  );
}

function RecallTrainer({ chapter }: { chapter: number }) {
  const cards = recallCards.filter((card) => card.chapter === chapter);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ got: 0, again: 0 });

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
    setScore({ got: 0, again: 0 });
  }, [chapter]);

  const card = cards[index];
  const finished = index >= cards.length;
  const reset = () => {
    setIndex(0);
    setRevealed(false);
    setScore({ got: 0, again: 0 });
  };
  const rate = (result: "got" | "again") => {
    setScore((current) => ({ ...current, [result]: current[result] + 1 }));
    setIndex((current) => current + 1);
    setRevealed(false);
  };

  return (
    <article className="recall-game recall-card-game">
      <header>
        <div>
          <span className="kicker">GAME 1 - SAY IT FIRST</span>
          <h3>One-question recall</h3>
        </div>
        <small>{Math.min(index + 1, cards.length)} / {cards.length}</small>
      </header>
      <div className="game-progress"><i style={{ width: `${(index / cards.length) * 100}%` }} /></div>
      {finished ? (
        <div className="game-finished">
          <Trophy />
          <h4>Round complete</h4>
          <p>You recalled {score.got} of {cards.length}. Repeat the {score.again} weak cards aloud.</p>
          <button onClick={reset}><RotateCcw /> Run it again</button>
        </div>
      ) : (
        <>
          <div className="recall-prompt">
            <span>Answer aloud before revealing</span>
            <h4>{card.prompt}</h4>
          </div>
          {!revealed ? (
            <button className="reveal-answer" onClick={() => setRevealed(true)}>
              <Eye /> Reveal answer
            </button>
          ) : (
            <div className="recall-reveal">
              <strong>Core answer</strong>
              <p>{card.answer}</p>
              <div>
                <b>Exam upgrade</b>
                <span>{card.examUpgrade}</span>
              </div>
              <footer>
                <button onClick={() => rate("again")}><RotateCcw /> Again</button>
                <button className="got-it" onClick={() => rate("got")}><ThumbsUp /> Got it</button>
              </footer>
            </div>
          )}
        </>
      )}
    </article>
  );
}

function SequenceTrainer({ chapter }: { chapter: number }) {
  const game = sequenceGames.find((item) => item.chapter === chapter)!;
  const choices = useMemo(
    () => [...game.items].sort((a, b) => b.localeCompare(a)),
    [game],
  );
  const [next, setNext] = useState(0);
  const [wrong, setWrong] = useState("");
  const complete = next === game.items.length;

  useEffect(() => {
    setNext(0);
    setWrong("");
  }, [chapter]);

  const choose = (item: string) => {
    if (item === game.items[next]) {
      setNext((current) => current + 1);
      setWrong("");
    } else {
      setWrong(item);
    }
  };
  const reset = () => {
    setNext(0);
    setWrong("");
  };

  return (
    <article className="recall-game sequence-game">
      <header>
        <div>
          <span className="kicker">GAME 2 - BUILD THE LIST</span>
          <h3>{game.title}</h3>
        </div>
        <small>{next} / {game.items.length}</small>
      </header>
      <p className="sequence-instruction">{game.instruction}</p>
      <div className="sequence-track">
        {game.items.map((item, index) => (
          <span className={index < next ? "filled" : ""} key={item}>
            <i>{index + 1}</i>
            {index < next ? item : "?"}
          </span>
        ))}
      </div>
      {!complete ? (
        <>
          <div className="sequence-choices">
            {choices.map((item) => {
              const used = game.items.indexOf(item) < next;
              return (
                <button
                  key={item}
                  disabled={used}
                  className={wrong === item ? "wrong" : ""}
                  onClick={() => choose(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <p className={`sequence-feedback ${wrong ? "show" : ""}`}>
            {wrong ? `Not yet. Step ${next + 1} starts with "${game.items[next].slice(0, 1)}".` : "Choose the next item."}
          </p>
        </>
      ) : (
        <div className="sequence-win">
          <CheckCircle2 />
          <div><strong>Locked in.</strong><span>Say the whole chain once without looking.</span></div>
          <button onClick={reset}><RotateCcw /> Reset</button>
        </div>
      )}
    </article>
  );
}
