import { useState } from "react";
import { Eye, EyeOff, RotateCcw, FlaskConical } from "lucide-react";

const configs: Record<number, { nodes: string[]; steps: string[] }> = {
  5: {
    nodes: ["User device", "Access layer", "Distribution", "Core / service"],
    steps: [
      "A user creates traffic at the edge.",
      "Access equipment admits and segments it.",
      "Distribution applies policy and aggregates paths.",
      "The core carries it quickly to its destination.",
    ],
  },
  6: {
    nodes: ["Listen", "Classify", "Diagnose", "Resolve & verify"],
    steps: [
      "Welcome the customer and capture the symptom.",
      "Create a precise problem statement and priority.",
      "Test hypotheses from broad to specific.",
      "Apply the solution and confirm success with the customer.",
    ],
  },
  7: {
    nodes: [
      "Propose",
      "Assess risk",
      "Approve & schedule",
      "Implement & review",
    ],
    steps: [
      "Describe scope, impact, test and rollback.",
      "Route the change according to risk.",
      "Reserve a safe window and communicate.",
      "Validate the result and record learning.",
    ],
  },
  8: {
    nodes: ["Observe", "Interpret", "Act", "Learn & improve"],
    steps: [
      "Collect service and end-to-end signals.",
      "Compare evidence with policy and thresholds.",
      "Alert, restore or scale as appropriate.",
      "Use trends and outcomes to improve the service.",
    ],
  },
};
export function ConceptDiagram({ chapter }: { chapter: number }) {
  const cfg = configs[chapter];
  const [labels, setLabels] = useState(true);
  const [test, setTest] = useState(false);
  const [active, setActive] = useState(0);
  return (
    <section className="diagram-card" aria-label="Interactive concept diagram">
      <div className="diagram-head">
        <div>
          <span className="kicker">INTERACTIVE PROCESS MAP</span>
          <h3>How the system flows</h3>
        </div>
        <div className="diagram-tools">
          <button onClick={() => setLabels(!labels)}>
            {labels ? <EyeOff size={15} /> : <Eye size={15} />}{" "}
            {labels ? "Hide labels" : "Show labels"}
          </button>
          <button
            className={test ? "selected" : ""}
            onClick={() => setTest(!test)}
          >
            <FlaskConical size={15} /> Test
          </button>
          <button
            aria-label="Reset diagram"
            onClick={() => {
              setActive(0);
              setLabels(true);
              setTest(false);
            }}
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
      <div className="flow-map">
        {cfg.nodes.map((n, i) => (
          <div className="flow-item" key={n}>
            <button
              onClick={() => setActive(i)}
              className={`flow-node ${active === i ? "active" : ""}`}
            >
              <span>{i + 1}</span>
              {labels && !test ? n : test ? "?" : n}
            </button>
            {i < cfg.nodes.length - 1 && (
              <div className="flow-line">
                <i />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="step-explain">
        <span>
          STEP {active + 1} OF {cfg.steps.length}
        </span>
        <p>
          {test
            ? "Choose a node, recall its role, then leave test mode to check."
            : cfg.steps[active]}
        </p>
      </div>
    </section>
  );
}
