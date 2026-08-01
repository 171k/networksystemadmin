import { useEffect, useMemo, useRef, useState } from "react";
import {
  HashRouter,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  BookOpen,
  Bookmark,
  Brain,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Download,
  FileText,
  Gauge,
  Library,
  Menu,
  Moon,
  NotebookPen,
  PanelLeftClose,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Sun,
  Target,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import {
  allConcepts,
  allModules,
  chapters,
  glossary,
} from "./content/curriculum";
import { ConceptDiagram } from "./components/diagrams/ConceptDiagram";
import { Practice } from "./components/exercises/Practice";
import {
  blankProgress,
  exportProgress,
  importProgress,
  loadProgress,
  saveProgress,
} from "./storage/progress";
import type { Progress } from "./types";
import "./index.css";

function percent(a: number, b: number) {
  return b ? Math.round((a / b) * 100) : 0;
}
function App() {
  const [progress, setProgress] = useState<Progress>(loadProgress);
  useEffect(() => {
    saveProgress(progress);
    document.documentElement.dataset.theme = progress.theme;
  }, [progress]);
  return (
    <HashRouter>
      <Shell progress={progress} setProgress={setProgress} />
    </HashRouter>
  );
}

function Shell({
  progress,
  setProgress,
}: {
  progress: Progress;
  setProgress: (p: Progress) => void;
}) {
  const [side, setSide] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <div className="app-shell">
      <aside
        className={`${side ? "" : "collapsed"} ${mobile ? "mobile-open" : ""}`}
      >
        <div className="brand">
          <div className="brandmark">IT</div>
          {side && (
            <div>
              <strong>ITT420</strong>
              <span>MASTERY</span>
            </div>
          )}
          <button
            aria-label="Close menu"
            className="mobile-x"
            onClick={() => setMobile(false)}
          >
            <X />
          </button>
        </div>
        {side && (
          <>
            <nav className="primary-nav">
              <NavLink to="/">
                <Gauge /> Overview
              </NavLink>
              <NavLink to="/review">
                <Brain /> Daily review{" "}
                <em>{Object.keys(progress.reviews).length}</em>
              </NavLink>
              <NavLink to="/glossary">
                <Library /> Glossary
              </NavLink>
              <NavLink to="/weak">
                <Target /> Weak concepts <em>{progress.weak.length}</em>
              </NavLink>
              <NavLink to="/mistakes">
                <NotebookPen /> Mistake notebook
              </NavLink>
            </nav>
            <div className="nav-label">COURSE CONTENT</div>
            <div className="chapter-nav">
              {chapters.map((c) => (
                <ChapterNav key={c.id} chapter={c} progress={progress} />
              ))}
            </div>
          </>
        )}
        <button className="collapse" onClick={() => setSide(!side)}>
          <PanelLeftClose className={!side ? "flip" : ""} />
          {side && "Collapse sidebar"}
        </button>
      </aside>
      <main>
        <header>
          <button className="menu" onClick={() => setMobile(true)}>
            <Menu />
          </button>
          <button className="global-search" onClick={() => setSearch(true)}>
            <Search />
            <span>Search concepts, terms, modules…</span>
            <kbd>⌘ K</kbd>
          </button>
          <div className="header-actions">
            <span className="sync">
              <i /> Saved locally
            </span>
            <button
              aria-label="Toggle theme"
              onClick={() =>
                setProgress({
                  ...progress,
                  theme: progress.theme === "light" ? "dark" : "light",
                })
              }
            >
              {progress.theme === "light" ? <Moon /> : <Sun />}
            </button>
            <NavLink aria-label="Settings" to="/settings">
              <Settings />
            </NavLink>
          </div>
        </header>
        <div className="page">
          <Routes>
            <Route path="/" element={<Dashboard progress={progress} />} />
            <Route
              path="/module/:id"
              element={<Lesson progress={progress} setProgress={setProgress} />}
            />
            <Route
              path="/review"
              element={<Review progress={progress} setProgress={setProgress} />}
            />
            <Route path="/glossary" element={<Glossary />} />
            <Route
              path="/weak"
              element={
                <ListPage
                  title="Weak concepts"
                  icon={<Target />}
                  ids={progress.weak}
                  empty="Concepts you miss in practice will appear here."
                />
              }
            />
            <Route
              path="/mistakes"
              element={<Mistakes progress={progress} />}
            />
            <Route
              path="/settings"
              element={
                <SettingsPage progress={progress} setProgress={setProgress} />
              }
            />
          </Routes>
        </div>
      </main>
      {search && <SearchModal close={() => setSearch(false)} />}
    </div>
  );
}

function ChapterNav({
  chapter,
  progress,
}: {
  chapter: (typeof chapters)[number];
  progress: Progress;
}) {
  const [open, setOpen] = useState(chapter.number === 5);
  return (
    <div className="chapter-group">
      <button onClick={() => setOpen(!open)}>
        <span style={{ background: chapter.color }}>{chapter.number}</span>
        <div>
          <strong>{chapter.title}</strong>
          <small>
            {percent(
              chapter.modules.filter((m) => progress.completed.includes(m.id))
                .length,
              chapter.modules.length,
            )}
            % complete
          </small>
        </div>
        {open ? <ChevronDown /> : <ChevronRight />}
      </button>
      {open && (
        <div className="module-links">
          {chapter.modules.map((m, i) => (
            <NavLink key={m.id} to={`/module/${m.id}`}>
              <i className={progress.completed.includes(m.id) ? "done" : ""}>
                {progress.completed.includes(m.id) ? "✓" : i + 1}
              </i>
              {m.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function Dashboard({ progress }: { progress: Progress }) {
  const mastery = percent(
    progress.understood.length + progress.memorized.length,
    allConcepts.length * 2,
  );
  return (
    <>
      <section className="welcome">
        <div>
          <span className="kicker">SEMESTER 6 · ITT420</span>
          <h1>Good evening, Razlan.</h1>
          <p>
            Continue building your understanding of infrastructure and IT
            service operations.
          </p>
        </div>
        <div
          className="mastery-ring"
          style={{ "--p": `${mastery * 3.6}deg` } as React.CSSProperties}
        >
          <div>
            <strong>{mastery}%</strong>
            <span>
              OVERALL
              <br />
              MASTERY
            </span>
          </div>
        </div>
      </section>
      <section className="metric-grid">
        <Metric
          icon={<BookOpen />}
          label="CONTENT VIEWED"
          value={`${percent(progress.viewed.length, allModules.length)}%`}
          note={`${progress.viewed.length} of ${allModules.length} modules`}
        />
        <Metric
          icon={<Brain />}
          label="CONCEPTS UNDERSTOOD"
          value={`${progress.understood.length}`}
          note={`of ${allConcepts.length} core concepts`}
        />
        <Metric
          icon={<Sparkles />}
          label="RECALL ACCURACY"
          value={`${percent(
            Object.values(progress.attempts).reduce((s, a) => s + a.correct, 0),
            Object.values(progress.attempts).reduce((s, a) => s + a.total, 0),
          )}%`}
          note="across all attempts"
        />
        <Metric
          icon={<Target />}
          label="WEAK CONCEPTS"
          value={`${progress.weak.length}`}
          note="need focused review"
          danger={progress.weak.length > 0}
        />
      </section>
      <div className="dashboard-grid">
        <section className="panel continue">
          <div className="panel-head">
            <div>
              <span className="kicker">CONTINUE LEARNING</span>
              <h2>Pick up where you left off</h2>
            </div>
            <NavLink to="/module/ch5-m1">
              View module <ChevronRight />
            </NavLink>
          </div>
          <div className="continue-body">
            <div className="chapter-number">05</div>
            <div>
              <span>CHAPTER 5 · MODULE 1</span>
              <h3>Network foundations</h3>
              <p>
                Understand how physical paths and logical rules work together,
                then use the OSI model to locate faults.
              </p>
              <div className="progress-line">
                <i
                  style={{
                    width: progress.viewed.includes("ch5-m1") ? "45%" : "8%",
                  }}
                />
              </div>
              <small>
                {progress.viewed.includes("ch5-m1")
                  ? "In progress"
                  : "Ready to begin"}{" "}
                · 28 min
              </small>
            </div>
            <NavLink className="round-go" to="/module/ch5-m1">
              <ChevronRight />
            </NavLink>
          </div>
        </section>
        <section className="panel review-card">
          <span className="kicker">DAILY REVIEW</span>
          <h2>Strengthen your memory</h2>
          <div className="review-count">
            <strong>{Math.max(5, Object.keys(progress.reviews).length)}</strong>
            <span>cards due today</span>
          </div>
          <NavLink className="primary wide" to="/review">
            Start review session <ChevronRight />
          </NavLink>
          <p>
            <i /> About 6 minutes
          </p>
        </section>
      </div>
      <section className="chapters-section">
        <div className="section-head">
          <div>
            <span className="kicker">YOUR COURSE</span>
            <h2>Explore the chapters</h2>
          </div>
          <span>
            {allModules.length} modules · {allConcepts.length} core concepts
          </span>
        </div>
        <div className="chapter-cards">
          {chapters.map((c) => (
            <NavLink
              to={`/module/${c.modules[0].id}`}
              key={c.id}
              className="chapter-card"
            >
              <div className="chapter-bar" style={{ background: c.color }} />
              <span>CHAPTER {c.number}</span>
              <h3>{c.title}</h3>
              <p>{c.short}</p>
              <div>
                <small>{c.modules.length} modules</small>
                <ChevronRight />
              </div>
            </NavLink>
          ))}
        </div>
      </section>
      <div className="source-alert">
        <CircleHelp />
        <div>
          <strong>Lecture coverage verified</strong>
          <p>
            All 177 instructional pages from Chapters 5-8 are mapped to 139
            concepts with lecture wording and source-page references.
          </p>
        </div>
      </div>
    </>
  );
}
function Metric({
  icon,
  label,
  value,
  note,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
  danger?: boolean;
}) {
  return (
    <div className="metric">
      <div className={danger ? "danger" : ""}>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function Lesson({
  progress,
  setProgress,
}: {
  progress: Progress;
  setProgress: (p: Progress) => void;
}) {
  const { id } = useParams();
  const module = allModules.find((m) => m.id === id) || allModules[0];
  const [tab, setTab] = useState("learn");
  const [conceptIdx, setConceptIdx] = useState(0);
  const concept = module.concepts[conceptIdx];
  useEffect(() => {
    if (!progress.viewed.includes(module.id))
      setProgress({ ...progress, viewed: [...progress.viewed, module.id] });
  }, [module.id, progress, setProgress]);
  const toggle = (key: "understood" | "bookmarks", value: string) =>
    setProgress({
      ...progress,
      [key]: progress[key].includes(value)
        ? progress[key].filter((x) => x !== value)
        : [...progress[key], value],
    });
  return (
    <>
      <div className="lesson-top">
        <div>
          <span className="kicker">
            CHAPTER {module.chapter} · {module.eyebrow}
          </span>
          <h1>{module.title}</h1>
          <p>
            {module.minutes} min · {module.concepts.length} core concepts
          </p>
        </div>
        <button
          className={progress.bookmarks.includes(module.id) ? "bookmarked" : ""}
          onClick={() => toggle("bookmarks", module.id)}
        >
          <Bookmark />{" "}
          {progress.bookmarks.includes(module.id) ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
      <div className="lesson-tabs">
        {["learn", "key concepts", "practice", "notes"].map((t) => (
          <button
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
            key={t}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "learn" && (
        <div className="lesson-grid">
          <div>
            <section className="lesson-card intro">
              <span className="kicker">MODULE INTRODUCTION</span>
              <h2>What you’ll learn</h2>
              <ul>
                {module.objectives.map((x) => (
                  <li key={x}>
                    <span>✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            </section>
            <section className="concept-switch">
              {module.concepts.map((c, i) => (
                <button
                  onClick={() => setConceptIdx(i)}
                  className={i === conceptIdx ? "active" : ""}
                  key={c.id}
                >
                  <span>0{i + 1}</span>
                  {c.title}
                </button>
              ))}
            </section>
            <section className="lesson-card explanation">
              <div className="concept-title">
                <div>
                  <span className="kicker">SIMPLE EXPLANATION</span>
                  <h2>{concept.title}</h2>
                </div>
                <button
                  aria-label="Bookmark concept"
                  onClick={() => toggle("bookmarks", concept.id)}
                >
                  <Bookmark
                    fill={
                      progress.bookmarks.includes(concept.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>
              <p className="lead">{concept.simple}</p>
              <div className="example">
                <strong>In practice</strong>
                <p>{concept.example}</p>
              </div>
              <details>
                <summary>
                  Formal lecture explanation <ChevronDown />
                </summary>
                <p>{concept.formal}</p>
                <small>Source: {concept.sourcePage}</small>
              </details>
            </section>
            <ConceptDiagram chapter={module.chapter} />
            <section className="lesson-card terms">
              <span className="kicker">KEY TERMS</span>
              <h2>Language to remember</h2>
              <div>
                {concept.terms.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </section>
            <Practice
              concept={concept}
              progress={progress}
              setProgress={setProgress}
            />
            <div className="lesson-complete">
              <div>
                <strong>Ready to move on?</strong>
                <p>
                  Mark this concept understood, or add it to focused review.
                </p>
              </div>
              <button
                onClick={() => toggle("understood", concept.id)}
                className={
                  progress.understood.includes(concept.id) ? "done" : ""
                }
              >
                {progress.understood.includes(concept.id)
                  ? "✓ Understood"
                  : "Mark as understood"}
              </button>
              <button
                onClick={() =>
                  setProgress({
                    ...progress,
                    weak: [...new Set([...progress.weak, concept.id])],
                  })
                }
              >
                Review again
              </button>
            </div>
          </div>
          <aside className="module-outline">
            <span className="kicker">IN THIS MODULE</span>
            {module.concepts.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setConceptIdx(i)}
                className={i === conceptIdx ? "active" : ""}
              >
                <i>{progress.understood.includes(c.id) ? "✓" : i + 1}</i>
                <span>
                  {c.title}
                  <small>
                    {progress.understood.includes(c.id)
                      ? "Understood"
                      : "Learn & practice"}
                  </small>
                </span>
              </button>
            ))}
            <div className="outline-progress">
              <span>Module progress</span>
              <strong>
                {percent(
                  module.concepts.filter((c) =>
                    progress.understood.includes(c.id),
                  ).length,
                  module.concepts.length,
                )}
                %
              </strong>
              <div>
                <i
                  style={{
                    width: `${percent(module.concepts.filter((c) => progress.understood.includes(c.id)).length, module.concepts.length)}%`,
                  }}
                />
              </div>
            </div>
          </aside>
        </div>
      )}
      {tab === "key concepts" && (
        <ListPage
          title={`${module.title} concepts`}
          icon={<BookOpen />}
          ids={module.concepts.map((c) => c.id)}
          empty=""
        />
      )}
      {tab === "practice" && (
        <Practice
          concept={concept}
          progress={progress}
          setProgress={setProgress}
        />
      )}{" "}
      {tab === "notes" && (
        <Notes
          moduleId={module.id}
          progress={progress}
          setProgress={setProgress}
        />
      )}
    </>
  );
}

function Notes({
  moduleId,
  progress,
  setProgress,
}: {
  moduleId: string;
  progress: Progress;
  setProgress: (p: Progress) => void;
}) {
  return (
    <section className="wide-card">
      <span className="kicker">PERSONAL NOTES</span>
      <h2>Make the module your own</h2>
      <textarea
        placeholder="Write explanations in your own words, add mnemonics, or note questions…"
        value={progress.notes[moduleId] || ""}
        onChange={(e) =>
          setProgress({
            ...progress,
            notes: { ...progress.notes, [moduleId]: e.target.value },
          })
        }
      />
      <small>Saved automatically on this device.</small>
    </section>
  );
}

function Review({
  progress,
  setProgress,
}: {
  progress: Progress;
  setProgress: (p: Progress) => void;
}) {
  const cards = progress.weak.length
    ? allConcepts.filter((c) => progress.weak.includes(c.id))
    : allConcepts.slice(0, 8);
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const c = cards[i % cards.length];
  const rate = (ease: number, days: number) => {
    setProgress({
      ...progress,
      reviews: {
        ...progress.reviews,
        [c.id]: {
          ease,
          next: new Date(Date.now() + days * 864e5).toISOString(),
          interval: days,
        },
      },
      memorized:
        ease >= 3
          ? [...new Set([...progress.memorized, c.id])]
          : progress.memorized,
    });
    setI(i + 1);
    setFlip(false);
  };
  return (
    <div className="focus-page">
      <span className="kicker">SPACED REPETITION</span>
      <h1>Daily review</h1>
      <p>{cards.length} cards selected from your learning history</p>
      <button
        className={`flashcard ${flip ? "flipped" : ""}`}
        onClick={() => setFlip(!flip)}
      >
        <span>{flip ? "ANSWER" : "RECALL PROMPT"}</span>
        <h2>
          {flip
            ? c.simple
            : `Explain “${c.title}” without looking at your notes.`}
        </h2>
        <small>
          {flip
            ? "Compare this with your own answer."
            : "Click to reveal answer"}
        </small>
      </button>
      <div className="recall-buttons">
        <button onClick={() => rate(1, 1)}>
          <b>Again</b>
          <span>1 day</span>
        </button>
        <button onClick={() => rate(2, 3)}>
          <b>Hard</b>
          <span>3 days</span>
        </button>
        <button onClick={() => rate(3, 7)}>
          <b>Good</b>
          <span>7 days</span>
        </button>
        <button onClick={() => rate(4, 14)}>
          <b>Easy</b>
          <span>14 days</span>
        </button>
      </div>
    </div>
  );
}

function Glossary() {
  const [q, setQ] = useState("");
  const items = glossary.filter((g) =>
    (g.term + g.concept).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div>
      <div className="page-title">
        <span className="kicker">SEARCHABLE REFERENCE</span>
        <h1>Glossary</h1>
        <p>{glossary.length} terms across all four chapters</p>
      </div>
      <div className="filter-search">
        <Search />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms or concepts…"
        />
      </div>
      <div className="glossary-grid">
        {items.map((g, i) => (
          <article key={g.term + i}>
            <span>{g.term[0].toUpperCase()}</span>
            <div>
              <h3>{g.term}</h3>
              <p>{g.definition}</p>
              <small>Related: {g.concept}</small>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
function ListPage({
  title,
  icon,
  ids,
  empty,
}: {
  title: string;
  icon: React.ReactNode;
  ids: string[];
  empty: string;
}) {
  const cs = allConcepts.filter((c) => ids.includes(c.id));
  return (
    <div>
      <div className="page-title">
        <span className="kicker">FOCUSED LEARNING</span>
        <h1>{title}</h1>
      </div>
      {cs.length ? (
        <div className="concept-list">
          {cs.map((c) => (
            <article key={c.id}>
              {icon}
              <div>
                <h3>{c.title}</h3>
                <p>{c.simple}</p>
                <span>{c.terms.join(" · ")}</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty">
          <Target />
          <h2>Nothing here yet</h2>
          <p>{empty}</p>
        </div>
      )}
    </div>
  );
}
function Mistakes({ progress }: { progress: Progress }) {
  return (
    <div>
      <div className="page-title">
        <span className="kicker">LEARN FROM ATTEMPTS</span>
        <h1>Mistake notebook</h1>
        <p>
          Incorrect answers are captured automatically with the correct
          explanation.
        </p>
      </div>
      {progress.mistakes.length ? (
        <div className="concept-list">
          {progress.mistakes.map((m) => (
            <article key={m.id}>
              <XCircle />
              <div>
                <h3>{m.prompt}</h3>
                <p>{m.answer}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty">
          <NotebookPen />
          <h2>Your notebook is clear</h2>
          <p>
            Complete knowledge checks to start building a useful mistake review.
          </p>
        </div>
      )}
    </div>
  );
}
function SettingsPage({
  progress,
  setProgress,
}: {
  progress: Progress;
  setProgress: (p: Progress) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const doImport = async (f?: File) => {
    if (!f) return;
    try {
      setProgress(await importProgress(f));
      setMessage("Progress imported successfully.");
    } catch {
      setMessage("That file is not a valid ITT420 Mastery export.");
    }
  };
  return (
    <div>
      <div className="page-title">
        <span className="kicker">LOCAL DATA</span>
        <h1>Settings & progress</h1>
        <p>Your learning data stays in this browser unless you export it.</p>
      </div>
      <div className="settings-grid">
        <section>
          <Download />
          <div>
            <h3>Export progress</h3>
            <p>
              Download notes, scores, reviews and mastery as versioned JSON.
            </p>
            <button
              className="primary"
              onClick={() => exportProgress(progress)}
            >
              Export JSON
            </button>
          </div>
        </section>
        <section>
          <Upload />
          <div>
            <h3>Import progress</h3>
            <p>Restore a previously exported ITT420 Mastery file.</p>
            <input
              ref={input}
              hidden
              type="file"
              accept="application/json"
              onChange={(e) => doImport(e.target.files?.[0])}
            />
            <button onClick={() => input.current?.click()}>Choose file</button>
          </div>
        </section>
        <section>
          <RotateCcw />
          <div>
            <h3>Reset progress</h3>
            <p>Clear all locally saved learning history and notes.</p>
            <button
              className="danger-btn"
              onClick={() =>
                confirm("Reset all progress?") &&
                setProgress({ ...blankProgress, theme: progress.theme })
              }
            >
              Reset everything
            </button>
          </div>
        </section>
      </div>
      {message && <div className="toast">{message}</div>}
    </div>
  );
}
function SearchModal({ close }: { close: () => void }) {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const results = useMemo(
    () =>
      q
        ? allModules
            .filter((m) =>
              (
                m.title +
                m.concepts.map((c) => c.title + c.terms.join(" ")).join(" ")
              )
                .toLowerCase()
                .includes(q.toLowerCase()),
            )
            .slice(0, 6)
        : allModules.slice(0, 5),
    [q],
  );
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div className="search-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div>
          <Search />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search all course content…"
          />
          <button onClick={close}>
            <X />
          </button>
        </div>
        <span>{q ? "RESULTS" : "QUICK ACCESS"}</span>
        {results.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              nav(`/module/${m.id}`);
              close();
            }}
          >
            <FileText />
            <div>
              <strong>{m.title}</strong>
              <small>
                Chapter {m.chapter} ·{" "}
                {m.concepts.map((c) => c.title).join(", ")}
              </small>
            </div>
            <ChevronRight />
          </button>
        ))}
      </div>
    </div>
  );
}
export default App;
