import type { ExamSubquestion } from "./examFocus";

export type PredictedQuestion = {
  id: string;
  question: string;
  chapter: number;
  title: string;
  marks: number;
  confidence: "Very high" | "High" | "Medium";
  reason: string;
  subquestions: ExamSubquestion[];
};

export type WildcardPrediction = {
  chapter: number;
  topic: string;
  prompt: string;
  answer: string;
  reason: string;
};

export const predictedQuestions: PredictedQuestion[] = [
  {
    id: "prediction-q1",
    question: "Question 1",
    chapter: 5,
    title: "Infrastructure design",
    marks: 15,
    confidence: "Very high",
    reason:
      "Every paper uses Question 1 for Chapter 5. NAC appeared in all three papers, while WAN topology and connection choice repeatedly supply the remaining marks.",
    subquestions: [
      {
        label: "1(a)",
        prompt:
          "A company must separate managed laptops, employee-owned devices and guests on its office network. Explain the three NAC options and how each controls access.",
        marks: 6,
        command: "Explain + apply",
        markPlan: "Three methods x (correct name 1 + applied operation 1).",
        answer: [
          "MAC-based NAC compares the connecting device's MAC address with an approved list and places known devices into an assigned VLAN.",
          "Authentication-based NAC verifies the user's credentials, then grants access and selects a VLAN according to that identity.",
          "Certificate-based NAC validates a trusted certificate installed on an organisation-managed device, providing stronger proof that the device is approved.",
        ],
        memory: "Device - Person - Proof: MAC, credentials, certificate.",
      },
      {
        label: "1(b)",
        prompt:
          "Recommend a resilient WAN topology for a company with branches in several regions. Explain why it is better than a single star.",
        marks: 5,
        command: "Recommend + justify",
        markPlan: "State the design, expose the star weakness, then explain resilience and regional benefit.",
        answer: [
          "Use a multi-star design with regional hubs, and provide a second hub or alternate connection for critical branches.",
          "A single star depends entirely on one central location, so that hub is a single point of failure that can disconnect every branch.",
          "Regional hubs reduce long-distance links and localise failures, while the alternate hub/path allows traffic to continue when the primary connection fails.",
        ],
        memory: "One hub risks everyone; regional and alternate hubs contain the damage.",
      },
      {
        label: "1(c)",
        prompt:
          "Compare a dedicated line with an Internet VPN and recommend a suitable hybrid WAN arrangement.",
        marks: 4,
        command: "Compare + recommend",
        markPlan: "One developed contrast for each option, followed by a justified recommendation.",
        answer: [
          "A dedicated line costs more but supplies contracted bandwidth and latency, giving predictable performance.",
          "An Internet VPN is cheaper and easier to deploy, but bandwidth, latency and availability are not guaranteed.",
          "Use the dedicated line as the normal path and an encrypted Internet VPN as the backup path, combining predictable service with cost-effective redundancy.",
        ],
        memory: "Dedicated buys guarantees; VPN buys economy.",
      },
    ],
  },
  {
    id: "prediction-q2",
    question: "Question 2",
    chapter: 6,
    title: "Helpdesk redesign",
    marks: 10,
    confidence: "Very high",
    reason:
      "All three papers test helpdesk organisation. Request tracking, specialisation and escalation are the most repeated applied themes.",
    subquestions: [
      {
        label: "2(a)",
        prompt:
          "A helpdesk loses tickets and treats every request as urgent. Explain how request-tracking software and a written emergency policy improve support.",
        marks: 6,
        command: "Explain + apply",
        markPlan: "Three tracking benefits plus the purpose and effect of an emergency definition.",
        answer: [
          "Request-tracking software creates one visible record for each request, preventing work from being forgotten or duplicated.",
          "It records priority, status, ownership and history so staff handle urgent work first and supervisors balance workload.",
          "Its statistics reveal repeated problems, staffing needs and customer-satisfaction trends.",
          "A written emergency policy defines which business impacts deserve emergency priority, lets administrators reject false emergencies consistently and gives management a clear basis for resolving disputes.",
        ],
        memory: "Track the work; define the urgency.",
      },
      {
        label: "2(b)",
        prompt:
          "Recommend how a large mixed-task helpdesk should be divided and explain how tiered escalation supports the design.",
        marks: 4,
        command: "Recommend + explain",
        markPlan: "Name the three groups, then connect first-line resolution to specialist escalation.",
        answer: [
          "Divide the helpdesk into new-service requests, problem reports and installation groups so each team develops focused skills, tools and supervision.",
          "First-line operators should resolve about 80-90% of routine enquiries. Complex incidents are escalated to higher tiers or service specialists, preserving expert time while giving difficult problems the right expertise.",
        ],
        memory: "Request - Repair - Rollout; most stay low, hard cases go high.",
      },
    ],
  },
  {
    id: "prediction-q3",
    question: "Question 3",
    chapter: 7,
    title: "Controlled change",
    marks: 12,
    confidence: "Very high",
    reason:
      "Question 3 belongs to Chapter 7 in every paper. The examiner rotates among technical plans, CRB classification, maintenance execution and centralisation.",
    subquestions: [
      {
        label: "3(a)",
        prompt:
          "A critical firewall change has no planned outage but could accidentally interrupt company access. Classify it and explain how risk is rated.",
        marks: 4,
        command: "Classify + explain",
        markPlan: "Correct classification and reason, followed by both risk factors and their combined effect.",
        answer: [
          "Classify it as a sensitive update because no outage is planned, but the change is large enough to create a meaningful accidental-outage risk.",
          "Risk is rated by combining the likelihood of failure with the potential impact of failure. Even a lower-likelihood change can be high risk when it could disconnect the whole company.",
        ],
        memory: "Sensitive hides risk without planning an outage; risk = likelihood plus impact.",
      },
      {
        label: "3(b)",
        prompt:
          "Produce the complete technical plan that should accompany the change request.",
        marks: 5,
        command: "Produce",
        markPlan: "Five parts x one accurate description.",
        answer: [
          "Change process: the exact implementation steps and responsible people.",
          "Testing documentation: evidence that the procedure worked in a test or staging environment.",
          "Success criteria: measurable checks proving the change succeeded.",
          "Backout plan: steps for restoring the previous known-good state.",
          "Decision point: the exact time or condition that triggers the backout plan.",
        ],
        memory: "P-T-S-B-D: Process, Testing, Success, Backout, Decision.",
      },
      {
        label: "3(c)",
        prompt:
          "State the three maintenance-window stages and identify the most important activity in each stage.",
        marks: 3,
        command: "State + identify",
        markPlan: "One stage paired with one correct defining action per mark.",
        answer: [
          "Preparation: appoint the flight director and combine approved proposals into a master plan.",
          "Execution: control customer access, perform work in dependency order and run the assigned tests.",
          "Resolution: announce the result, restore access and remain ready for post-change problems.",
        ],
        memory: "Prepare - Execute - Resolve.",
      },
    ],
  },
  {
    id: "prediction-q4",
    question: "Question 4",
    chapter: 8,
    title: "Reliable shared services",
    marks: 15,
    confidence: "High",
    reason:
      "Question 4 always tests Chapter 8. Web scaling has appeared in every paper, while monitoring, backup, DNS and email reliability rotate around it.",
    subquestions: [
      {
        label: "4(a)",
        prompt:
          "Differentiate real-time and historical monitoring and apply each one to an unreliable DNS service.",
        marks: 5,
        command: "Differentiate + apply",
        markPlan: "Define both types, contrast their purpose, then apply both to DNS.",
        answer: [
          "Real-time monitoring detects current conditions and alerts staff immediately; it should report resolver failure, high latency or failed DNS queries.",
          "Historical monitoring stores long-term usage and performance trends for capacity planning and anomaly detection; it can reveal growing query load or repeated latency spikes before a major outage.",
          "Real time answers what is broken now, while history shows what is changing over time.",
        ],
        memory: "React now; plan from trends.",
      },
      {
        label: "4(b)",
        prompt:
          "Explain three measures that improve DNS or email-service reliability.",
        marks: 5,
        command: "Explain",
        markPlan: "Three distinct measures with a clear failure that each measure tolerates.",
        answer: [
          "Use multiple DNS resolvers or authoritative servers so one server failure does not remove the service.",
          "Use DNS anycast so one shared address is routed to an available suitable server and failover occurs through routing.",
          "For email, deploy redundant servers and a backup MX that accepts and queues inbound mail while the primary system is unavailable.",
          "RAID, redundant interfaces and redundant power supplies can additionally tolerate component failures.",
        ],
        memory: "More servers, another route, redundant components.",
      },
      {
        label: "4(c)",
        prompt:
          "Analyse horizontal scaling for a busy web service and explain why the replicas need a shared database.",
        marks: 5,
        command: "Analyse + explain",
        markPlan: "Define the architecture, give performance and availability effects, then explain consistent shared state.",
        answer: [
          "Horizontal scaling places several equivalent web servers behind a load balancer, which distributes incoming requests across the available replicas.",
          "It increases total capacity, reduces load per server, improves response time and allows another replica to continue if one server fails.",
          "The replicas use a shared database so every server sees the same accounts, transactions and application state; otherwise a user could receive inconsistent data when successive requests reach different servers.",
        ],
        diagram: [
          "[Users] -> [Load balancer] -> [Web 1] --\\",
          "                         -> [Web 2] ----> [Shared database]",
          "                         -> [Web 3] --/",
        ],
        memory: "One front door, many identical workers, one shared truth.",
      },
    ],
  },
];

export const wildcardPredictions: WildcardPrediction[] = [
  {
    chapter: 5,
    topic: "Datacentre capacity",
    prompt: "List the resources tracked in datacentre capacity management.",
    answer: "Space, power, cooling, wiring, network ports and console ports, with occupied, reserved and free capacity recorded accurately.",
    reason: "It is a compact memorisation list identified as a remaining weak area and has not yet been directly used in Part B.",
  },
  {
    chapter: 6,
    topic: "Nine incident steps",
    prompt: "Describe the complete customer-request handling process.",
    answer: "Greeting; problem classification; problem statement; problem verification; solution proposals; solution selection; execution; craft verification; customer verification and closing.",
    reason: "The sequence is a major lecture framework but has not appeared directly in the three recent Part B papers.",
  },
  {
    chapter: 7,
    topic: "Centralisation process",
    prompt: "List the seven steps used to centralise an existing service.",
    answer: "Understand the current solution; make a detailed plan; gain management support and budget; fix causes of decentralisation; provide an excellent service; start slowly and ramp up; pursue low-hanging fruit.",
    reason: "Centralisation appeared twice, but the full seven-step process remains an obvious unused structured-list question.",
  },
  {
    chapter: 8,
    topic: "Namespace governance",
    prompt: "Explain the scope, consistency and authority decisions for a namespace.",
    answer: "Scope states where the namespace is used; consistency states when shared attributes must agree; authority identifies the master service that owns each value.",
    reason: "The chat identified this exact three-part list as a weak spot, and it has not yet appeared directly in Part B.",
  },
  {
    chapter: 8,
    topic: "Restore reasons",
    prompt: "State three reasons an organisation restores data.",
    answer: "Recover an accidentally deleted file; rebuild all data after disk failure; retrieve an archival snapshot for disaster recovery, legal or fiduciary purposes.",
    reason: "It is a clean three-part lecture list that has not appeared directly in the recent structured questions.",
  },
];
