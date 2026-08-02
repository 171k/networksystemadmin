export type MemoryBlock = {
  title: string;
  remember: string;
  examLine: string;
  hook: string;
  trap: string;
};

export type ExamChapterGuide = {
  chapter: number;
  title: string;
  color: string;
  bigPicture: string;
  frequency: string[];
  flow: string[];
  memory: MemoryBlock[];
  checkpoint: string[];
  moduleId: string;
};

export type ExamSubquestion = {
  label: string;
  prompt: string;
  marks: number;
  command: string;
  markPlan: string;
  answer: string[];
  memory?: string;
  diagram?: string[];
};

export type ExamPaperGroup = {
  id: string;
  paper: string;
  chapter: number;
  question: string;
  page: number;
  subquestions: ExamSubquestion[];
};

export type ExamMcq = {
  id: string;
  paper: string;
  number: number;
  chapter: number;
  prompt: string;
  answer: string;
  reason: string;
};

export type RecallCard = {
  id: string;
  chapter: number;
  prompt: string;
  answer: string;
  examUpgrade: string;
};

export type SequenceGame = {
  chapter: number;
  title: string;
  instruction: string;
  items: string[];
};

export const examChapterGuides: ExamChapterGuide[] = [
  {
    chapter: 5,
    title: "Infrastructure",
    color: "#1e63d5",
    bigPicture:
      "Design a network that connects people reliably, controls who enters, survives a failed path and gives every service the right route in and out.",
    frequency: [
      "NAC appeared in all 3 papers",
      "WAN topology appeared in 2 papers",
      "Wired, wireless and Internet design appeared in 2 papers",
    ],
    flow: ["Connect", "Control access", "Route", "Add redundancy", "Monitor"],
    memory: [
      {
        title: "Three NAC options",
        remember:
          "MAC-based checks the device address; authentication-based checks user credentials; certificate-based checks a trusted digital certificate.",
        examLine:
          "NAC determines whether a device may join the network and which VLAN it should enter.",
        hook: "Device - Person - Proof: MAC, credentials, certificate.",
        trap: "Do not describe NAC as only blocking devices; it can also assign the correct VLAN.",
      },
      {
        title: "WAN topology choice",
        remember:
          "A star is simple but its hub is a single point of failure. Dual-star adds a second hub; multi-star uses regional hubs; ring supplies an alternate direction; cloud lets the provider interconnect sites.",
        examLine:
          "The weakness of a star is total dependence on the central site, so a dual-star removes that single point of failure.",
        hook: "One hub = one big failure. Two hubs = a second path.",
        trap: "Do not suggest another single star. Every branch must actually have an alternate path.",
      },
      {
        title: "Wired versus wireless",
        remember:
          "Wired gives reliability, speed and resistance to radio interference. Wireless gives mobility and easier access where cabling is inconvenient.",
        examLine:
          "Use wired links for stable high-throughput endpoints and wireless access for mobile users.",
        hook: "Wire = stable. Wi-Fi = mobile.",
        trap: "Do not claim wireless is always faster; the lecture advantage is mobility.",
      },
      {
        title: "Dedicated line versus VPN",
        remember:
          "A dedicated line gives guaranteed bandwidth and latency but costs more. An Internet VPN is cheaper and faster to deploy, but performance is not guaranteed.",
        examLine:
          "A hybrid WAN can use the dedicated circuit normally and a VPN as the backup path.",
        hook: "Dedicated = guarantee. VPN = economy.",
        trap: "VPN encryption does not guarantee bandwidth, latency or availability.",
      },
      {
        title: "Internet access has two sides",
        remember:
          "Outbound access is how employees reach Internet services. Inbound access is how the organisation publishes its own services to the Internet.",
        examLine:
          "The architecture must separately control outbound user traffic and inbound public-service traffic.",
        hook: "Out = users leave. In = customers arrive.",
        trap: "Do not mix up traffic direction: define it from the organisation's point of view.",
      },
    ],
    checkpoint: [
      "Name and explain all three NAC options without looking.",
      "Why is a star topology risky, and which design fixes it?",
      "Give two wired advantages and one wireless advantage.",
      "State one VPN advantage and one VPN disadvantage.",
    ],
    moduleId: "ch5-m1",
  },
  {
    chapter: 6,
    title: "Helpdesks & Support",
    color: "#7a3ee6",
    bigPicture:
      "Turn random interruptions into a visible support process: welcome the customer, capture the request, assign the right priority, solve at the right tier and preserve what the team learns.",
    frequency: [
      "Helpdesk division appeared in all 3 papers",
      "Request tracking appeared in 2 papers",
      "Escalation and customer experience are repeated favourites",
    ],
    flow: ["Greet", "Identify", "Plan", "Execute", "Verify"],
    memory: [
      {
        title: "Divide the helpdesk by work",
        remember:
          "Use separate groups for new service requests, problem reports and physical installations. Each group can have focused skills, tools and supervision.",
        examLine:
          "Specialisation reduces delays, improves expertise and makes workload and supervision easier to manage.",
        hook: "Request - Repair - Rollout.",
        trap: "Separate expertise, but keep shared tracking so work does not disappear between groups.",
      },
      {
        title: "Request-tracking software",
        remember:
          "It records every request, assigns priority and ownership, preserves history, reveals trends and collects customer-satisfaction data.",
        examLine:
          "A shared ticket queue prevents lost requests and turns support activity into measurable data for staffing and improvement.",
        hook: "Track - Prioritise - Learn.",
        trap: "A ticket tool supports the process; it cannot fix unclear ownership or bad priorities by itself.",
      },
      {
        title: "Tiered escalation",
        remember:
          "First-line operators should resolve 80-90% of routine calls. Difficult or specialist issues move to higher tiers with deeper expertise.",
        examLine:
          "Escalation matches problem difficulty to technician expertise without making experts handle every basic request.",
        hook: "Most stay low; hard cases go high.",
        trap: "Escalation is not passing every difficult customer away; first line should still solve most calls.",
      },
      {
        title: "Scope of support",
        remember:
          "A written policy states what, who, where and when the team supports, how users request help and the expected completion time.",
        examLine:
          "A clear scope prevents ad hoc interruptions and sets consistent customer expectations.",
        hook: "What - Who - Where - When - How long.",
        trap: "Support scope is broader than opening hours; include users, services, location and completion expectations.",
      },
      {
        title: "Friendly faces",
        remember:
          "Make the physical desk pleasant, the portal calm and readable, staff welcoming, and the support style appropriate to company culture.",
        examLine:
          "Friendly presentation lowers customer stress and improves cooperation during diagnosis.",
        hook: "Place - Page - People - Culture.",
        trap: "Do not answer only with colours and furniture; staff attitude and customer culture earn separate points.",
      },
    ],
    checkpoint: [
      "What three groups can a helpdesk be divided into?",
      "Give three functions of request-tracking software.",
      "Why should first line solve most calls?",
      "Recite the five scope-of-support questions.",
    ],
    moduleId: "ch6-m1",
  },
  {
    chapter: 7,
    title: "Change Processes",
    color: "#d97706",
    bigPicture:
      "A production change is not just technical work. It is a controlled promise: plan it, prove it, approve it, execute it, verify it and know exactly when to reverse it.",
    frequency: [
      "Change governance appeared in all 3 papers",
      "Centralisation appeared in 2 papers",
      "Maintenance execution appeared in February 2026",
    ],
    flow: ["Request", "Plan", "Review", "Approve", "Execute", "Verify", "Close"],
    memory: [
      {
        title: "Four change classifications",
        remember:
          "Routine: no expected outage and almost no accidental-outage risk. Major: many systems or significant planned outage. Sensitive: no planned outage but a large risky change. Emergency: cannot wait for the next CRB.",
        examLine:
          "Classification depends on outage, breadth, risk and urgency, not merely how difficult the commands are.",
        hook: "Routine safe; Major planned outage; Sensitive hidden risk; Emergency cannot wait.",
        trap: "Sensitive means no planned outage but meaningful accidental-outage risk; major includes a planned significant outage.",
      },
      {
        title: "Five-part technical plan",
        remember:
          "Change process, testing documentation, success criteria, backout plan and decision point.",
        examLine:
          "The decision point states the exact condition or time that triggers the backout plan.",
        hook: "Please Test Systems Before Deployment: P-T-S-B-D.",
        trap: "A backout plan says how to reverse; a decision point says exactly when to begin reversing.",
      },
      {
        title: "Three CRB levels",
        remember:
          "Level 1 is technical management and checks planning/testing. Level 2 is higher IT management and checks wider IT impact. Level 3 reviews promoted high-risk work against both business and IT needs.",
        examLine:
          "Riskier changes move upward from technical correctness to enterprise-wide business coordination.",
        hook: "Technical - IT - Business + IT.",
        trap: "The CRB governs and coordinates changes; it does not personally execute every change.",
      },
      {
        title: "Maintenance-window stages",
        remember:
          "Preparation builds the master plan; execution disables access, follows dependency order, performs work and tests; resolution announces completion and restores access.",
        examLine:
          "During execution, follow the approved sequence and run the assigned tests before services are reopened.",
        hook: "Prepare - Execute - Resolve.",
        trap: "Do not place proposal collection in execution or access restoration before verification.",
      },
      {
        title: "Why centralise",
        remember:
          "Centralisation reduces duplicated work and licences, standardises architecture and security, improves automation, documentation, monitoring and service quality.",
        examLine:
          "Central control improves consistency, but local needs and the central platform's failure impact must still be managed.",
        hook: "One standard, one control point, less duplication.",
        trap: "Centralisation is not automatically reliable; the central platform needs redundancy and capacity.",
      },
    ],
    checkpoint: [
      "Classify routine, major, sensitive and emergency changes.",
      "Name P-T-S-B-D and explain decision point versus backout plan.",
      "What does each CRB tier review?",
      "What happens during maintenance execution?",
    ],
    moduleId: "ch7-m1",
  },
  {
    chapter: 8,
    title: "Service Recommendations",
    color: "#07866d",
    bigPicture:
      "Build shared services that stay observable, reliable and recoverable: monitor them, remove single points of failure, protect their data and scale the busy parts deliberately.",
    frequency: [
      "Web scaling appeared in all 3 papers",
      "Storage/backup appeared in 2 papers",
      "Monitoring, DNS and email reliability are recurring targets",
    ],
    flow: ["Observe", "Make redundant", "Protect data", "Scale", "Recover"],
    memory: [
      {
        title: "Two monitoring types",
        remember:
          "Real-time monitoring detects current failures and triggers immediate action. Historical monitoring stores trends for capacity planning and long-term anomaly detection.",
        examLine:
          "Real time answers 'what is broken now?'; history answers 'what is changing over time?'.",
        hook: "Now versus trend.",
        trap: "Immediate link-down notification is real time, not a historical-trend function.",
      },
      {
        title: "Name-service reliability",
        remember:
          "DNS needs multiple resolvers and authoritative servers; anycast lets one address reach a suitable server and fail over through routing.",
        examLine:
          "Name services require high reliability because their failure creates cascading failures in dependent services.",
        hook: "If names fail, everything looks broken.",
        trap: "A second server helps only when clients can reach it and failover is designed correctly.",
      },
      {
        title: "Five parts of email",
        remember:
          "MTA transports between servers; MDA delivers to storage; POP3/IMAP4 access servers serve the MUA; list processing handles groups; filtering blocks spam and malware.",
        examLine:
          "Mail flows through transport and filtering to delivery/storage, then the user accesses it through POP3 or IMAP4.",
        hook: "Transport - Deliver - Access - Lists - Filter.",
        trap: "Do not list MUA alone as the access service; state POP3/IMAP4 access for the MUA.",
      },
      {
        title: "Centralised backup",
        remember:
          "Backups are important and expensive. Centralising them spreads specialist equipment and staff cost across systems, standardises policy and makes restores easier to control.",
        examLine:
          "RAID improves availability after disk failure, but it is not a backup against deletion, corruption or disaster.",
        hook: "RAID keeps running; backup goes back.",
        trap: "RAID cannot recover an accidentally deleted or corrupted file copied across the array.",
      },
      {
        title: "Horizontal versus vertical scaling",
        remember:
          "In these lecture notes, horizontal scaling replicates equivalent web servers behind a load balancer. Vertical scaling separates the specialised service layers used to build a response, such as web, application and database tiers.",
        examLine:
          "Horizontal scaling adds parallel capacity and redundancy; vertical scaling isolates roles so each layer can be tuned independently.",
        hook: "Horizontal = copies. Vertical = layers.",
        trap: "For this paper, do not replace the slide definition of vertical scaling with 'add CPU and RAM'.",
      },
    ],
    checkpoint: [
      "Compare real-time and historical monitoring.",
      "How does anycast improve DNS resilience?",
      "Name all five email parts in order.",
      "Why is RAID not a backup?",
      "Draw horizontal scaling with a load balancer and shared database.",
    ],
    moduleId: "ch8-m1",
  },
];

export const examPaperGroups: ExamPaperGroup[] = [
  {
    id: "feb25-q1",
    paper: "February 2025",
    chapter: 5,
    question: "Question 1",
    page: 4,
    subquestions: [
      {
        label: "1(a)",
        prompt: "Identify the problem with a star WAN topology and suggest the solution.",
        marks: 5,
        command: "Identify + suggest",
        markPlan: "Name the failure (1), explain its effect (2), name the improved topology (1), explain the second path (1).",
        answer: [
          "A star WAN depends on one central location, so that hub and its links form a single point of failure.",
          "If the central site fails, every branch loses connectivity even when the branch equipment is healthy.",
          "Use a dual-star design with a second central location. Each branch has an alternate path, so traffic can continue through the backup hub when the primary hub fails.",
        ],
        memory: "One hub fails everyone; a second hub supplies the escape path.",
      },
      {
        label: "1(b)",
        prompt: "Draw the topology suggested in 1(a).",
        marks: 4,
        command: "Draw",
        markPlan: "Show two labelled hubs, multiple branches and a connection from every branch to both hubs.",
        answer: [
          "Draw two central sites labelled Primary DC and Backup DC.",
          "Connect Branch A, Branch B and Branch C to both central sites. The duplicated paths are the marks; do not draw a second isolated star.",
        ],
        diagram: [
          "             [Primary DC]",
          "              /    |    \\",
          "       [Branch A] [Branch B] [Branch C]",
          "              \\    |    /",
          "              [Backup DC]",
        ],
      },
      {
        label: "1(c)",
        prompt: "List and briefly describe the three NAC options.",
        marks: 6,
        command: "List + describe",
        markPlan: "Three options x (name 1 + description 1).",
        answer: [
          "MAC-based NAC identifies the device by its Media Access Control address and allows or places known devices into an assigned VLAN.",
          "Authentication-based NAC asks the user for approved credentials and grants access according to the authenticated identity.",
          "Certificate-based NAC requires a trusted digital certificate on the device, giving stronger proof that it is organisation-managed.",
        ],
        memory: "MAC checks the device, credentials check the person, certificate checks trusted proof.",
      },
    ],
  },
  {
    id: "feb25-q2",
    paper: "February 2025",
    chapter: 6,
    question: "Question 2",
    page: 4,
    subquestions: [
      {
        label: "2(a)",
        prompt: "Discuss ways customer support can provide friendly faces.",
        marks: 4,
        command: "Discuss",
        markPlan: "Give four distinct, explained ways rather than repeating 'be friendly'.",
        answer: [
          "Make a physical helpdesk pleasant, clearly signed and welcoming.",
          "Use a web helpdesk with soothing colours, readable fonts and simple navigation.",
          "Train staff to greet customers calmly, listen respectfully and remain good-natured.",
          "Match the dress and communication style to the organisation's customer culture.",
        ],
        memory: "Place, page, people and culture.",
      },
      {
        label: "2(b)",
        prompt: "Construct a division of helpdesks for different needs and functions.",
        marks: 6,
        command: "Construct",
        markPlan: "Three groups x (group 1 + function 1).",
        answer: [
          "New-service request group: provisions accounts, access and other new services.",
          "Problem-report group: diagnoses failures in existing services and escalates complex incidents.",
          "Installation group: schedules and performs physical workstation, device and software installations.",
          "Give each group suitable training and supervision while keeping one tracking system so requests are not lost between groups.",
        ],
        memory: "Request, repair, rollout.",
      },
    ],
  },
  {
    id: "feb25-q3",
    paper: "February 2025",
    chapter: 7,
    question: "Question 3",
    page: 4,
    subquestions: [
      {
        label: "3(a)",
        prompt: "Produce a complete technical plan required in change management.",
        marks: 5,
        command: "Produce",
        markPlan: "One mark for each named and correctly described part.",
        answer: [
          "Change process: the exact implementation steps and responsible people.",
          "Testing documentation: evidence that the procedure worked in a test or staging environment.",
          "Success criteria: measurable checks that prove the change worked.",
          "Backout plan: steps that restore the previous known-good state.",
          "Decision point: the precise time or condition that triggers backout.",
        ],
        memory: "Please Test Systems Before Deployment - Process, Testing, Success, Backout, Decision.",
      },
      {
        label: "3(b)",
        prompt: "Distinguish all levels of tiered Change Review Boards.",
        marks: 5,
        command: "Distinguish",
        markPlan: "Name all three levels and make their different scope explicit.",
        answer: [
          "Lowest CRB: technology-specific technical managers verify that the change is properly planned and tested.",
          "Middle CRB: higher IT managers examine cross-system impact, scheduling and wider IT risk.",
          "Final CRB: reviews promoted high-risk changes against both business and IT needs and other major company initiatives.",
        ],
        memory: "Technical, wider IT, then business plus IT.",
      },
    ],
  },
  {
    id: "feb25-q4",
    paper: "February 2025",
    chapter: 8,
    question: "Question 4",
    page: 4,
    subquestions: [
      {
        label: "4(a)",
        prompt: "Identify five techniques or technologies for managing data storage.",
        marks: 5,
        command: "Identify",
        markPlan: "Five distinct valid items, one mark each. Add a few words to remove ambiguity.",
        answer: [
          "Treat storage as a shared community resource rather than isolated disks.",
          "Perform a needs assessment for capacity, performance, availability and retention.",
          "Map groups to suitable storage such as DAS, NAS or SAN tiers.",
          "Maintain an inventory and spare-parts policy.",
          "Plan future growth and establish storage standards.",
        ],
        memory: "Share, assess, map, inventory, plan.",
      },
      {
        label: "4(b)",
        prompt: "List five main parts of an email service.",
        marks: 5,
        command: "List",
        markPlan: "Five named parts, one mark each.",
        answer: [
          "Mail Transfer Agent (MTA) for server-to-server transport.",
          "Mail Delivery Agent (MDA) for final mailbox delivery and storage.",
          "POP3/IMAP4 access server for the Mail User Agent (MUA).",
          "Mailing-list processing.",
          "Antispam and antivirus filtering.",
        ],
        memory: "Transport, deliver, access, lists, filter.",
      },
      {
        label: "4(c)",
        prompt: "Illustrate horizontal scaling with a load balancer and shared database.",
        marks: 5,
        command: "Illustrate",
        markPlan: "Show clients, load balancer, at least two identical web servers and one shared database; label the flow.",
        answer: [
          "The load balancer distributes independent requests across equivalent web servers.",
          "All web servers use the same shared database so users see consistent data.",
        ],
        diagram: [
          "[Users] -> [Load balancer] -> [Web 1] --\\",
          "                         -> [Web 2] ----> [Shared DB]",
          "                         -> [Web 3] --/",
        ],
        memory: "One front door, many identical workers, one shared source of data.",
      },
    ],
  },
  {
    id: "jul25-q1",
    paper: "July 2025",
    chapter: 5,
    question: "Question 1",
    page: 4,
    subquestions: [
      {
        label: "1(a)",
        prompt: "Give two wired-network advantages and one wireless-network advantage.",
        marks: 5,
        command: "Provide",
        markPlan: "Use two explained wired advantages and one explained wireless advantage.",
        answer: [
          "Wired links are more reliable because the physical connection is not affected by radio interference.",
          "Wired links generally provide higher and more predictable bandwidth with lower latency.",
          "Wireless access provides mobility, allowing users to move and connect where running a cable is inconvenient.",
        ],
        memory: "Wire is stable and fast; wireless moves.",
      },
      {
        label: "1(b)",
        prompt: "Describe two NAC methods and how they work.",
        marks: 4,
        command: "Describe",
        markPlan: "Any two methods x (name 1 + operation 1).",
        answer: [
          "Authentication-based NAC verifies a user's credentials, then grants access and assigns a permitted VLAN based on identity.",
          "Certificate-based NAC checks a trusted device certificate, allowing managed company devices to receive the appropriate access level.",
          "MAC-based NAC is also valid: it compares the device's MAC address with an approved list and places it into the assigned VLAN.",
        ],
      },
      {
        label: "1(c)",
        prompt: "Explain one advantage and one disadvantage of an Internet VPN over a dedicated WAN line.",
        marks: 6,
        command: "Explain",
        markPlan: "State, explain and apply one advantage; repeat for one disadvantage.",
        answer: [
          "Advantage: an Internet VPN is more cost-effective and can be deployed without purchasing an expensive distance-based dedicated circuit.",
          "Disadvantage: Internet bandwidth, latency and availability are not guaranteed, so performance may vary with congestion or provider conditions.",
        ],
        memory: "VPN saves cost; dedicated lines buy predictability.",
      },
    ],
  },
  {
    id: "jul25-q2",
    paper: "July 2025",
    chapter: 6,
    question: "Question 2",
    page: 4,
    subquestions: [
      {
        label: "2(a)",
        prompt: "Describe why the company implements a tiered helpdesk escalation process.",
        marks: 4,
        command: "Describe",
        markPlan: "Explain first-line efficiency, expert escalation, workload and response benefit.",
        answer: [
          "First-line operators resolve the large majority of routine requests quickly using scripts and known procedures.",
          "Only complex issues move to higher tiers with specialist knowledge, so expert time is not consumed by basic calls.",
          "This matches problem difficulty to staff skill, controls workload and improves response and resolution time.",
        ],
        memory: "Most stay low; hard cases go high.",
      },
      {
        label: "2(b)",
        prompt: "Justify the role of request-tracking software in improving support efficiency.",
        marks: 6,
        command: "Justify",
        markPlan: "Give three developed benefits or six concise linked points.",
        answer: [
          "It creates one visible record for every request, preventing tickets from being forgotten or duplicated.",
          "Priority, status and ownership let staff work urgent incidents first and let supervisors balance workload.",
          "History preserves previous actions and solutions, which speeds diagnosis and supports escalation.",
          "Statistics reveal common issues, service trends and staffing needs, while automatic surveys measure customer satisfaction.",
        ],
        memory: "Track work now; learn from it later.",
      },
    ],
  },
  {
    id: "jul25-q3",
    paper: "July 2025",
    chapter: 7,
    question: "Question 3",
    page: 5,
    subquestions: [
      {
        label: "3(a)(i)",
        prompt: "List the change-request classifications used by the CRB.",
        marks: 2,
        command: "List",
        markPlan: "List all four classifications concisely.",
        answer: ["Routine update, major update, sensitive update and emergency update."],
        memory: "Routine, major, sensitive, emergency.",
      },
      {
        label: "3(a)(ii)",
        prompt: "Define a major update.",
        marks: 3,
        command: "Define",
        markPlan: "State breadth/outage, then connect it to the scenario.",
        answer: [
          "A major update affects many systems or requires a significant system, network or service outage.",
          "The scenario is major because thousands of users are affected and a temporary outage is planned.",
        ],
      },
      {
        label: "3(b)",
        prompt: "Justify benefits of a strictly centralised service model for security and infrastructure.",
        marks: 5,
        command: "Justify",
        markPlan: "Give linked security and infrastructure benefits, not a generic definition.",
        answer: [
          "Security policy, authentication and authorisation are enforced consistently from one controlled architecture, reducing weak local exceptions.",
          "Sensitive data can use one protection, audit and monitoring standard, making incidents easier to detect and investigate.",
          "Infrastructure standards prevent incompatible designs and duplicate address space, while common tooling simplifies documentation, automation and support.",
          "Shared platforms reduce duplicated equipment, licences and administration effort, improving efficiency and service quality.",
        ],
        memory: "One policy, one standard, less duplication.",
      },
    ],
  },
  {
    id: "jul25-q4",
    paper: "July 2025",
    chapter: 8,
    question: "Question 4",
    page: 5,
    subquestions: [
      {
        label: "4(a)",
        prompt: "Give two monitoring types and their significance.",
        marks: 5,
        command: "Provide",
        markPlan: "Name and explain both types, then link each to the scenario.",
        answer: [
          "Real-time monitoring detects current faults, load and security events and sends immediate alerts; it would warn the team when DNS, email or web service fails.",
          "Historical monitoring stores usage and performance trends for capacity planning and long-term anomaly detection; it would reveal growing traffic and recurring slowdown patterns.",
        ],
        memory: "Real time reacts; history predicts.",
      },
      {
        label: "4(b)",
        prompt: "State two major reasons backups should be centralised.",
        marks: 5,
        command: "State + support",
        markPlan: "Give the two lecture reasons, then develop their practical effect.",
        answer: [
          "Backups are important: central control applies one tested policy, inventory and restore process so critical systems are not missed.",
          "Backups are expensive: specialist hardware, media, software and staff can be shared across many systems, spreading investment and reducing duplicated cost.",
        ],
        memory: "Important and expensive.",
      },
      {
        label: "4(c)",
        prompt: "Differentiate the impact of horizontal scaling on web performance under high traffic.",
        marks: 5,
        command: "Differentiate + apply",
        markPlan: "Define it, explain distribution, performance, availability and one condition/trade-off.",
        answer: [
          "Horizontal scaling adds equivalent web servers and places them behind a load balancer.",
          "Requests are distributed across replicas, so no single server handles all traffic; throughput and response time improve under high load.",
          "It also adds resilience because another replica can continue if one fails.",
          "Shared state must be stored consistently, for example in a shared database, and the load balancer must not remain an unprotected single point of failure.",
        ],
      },
    ],
  },
  {
    id: "feb26-q1",
    paper: "February 2026",
    chapter: 5,
    question: "Question 1",
    page: 5,
    subquestions: [
      {
        label: "1(a)",
        prompt: "Classify the NAC options for securing a wired office and show how each is applied.",
        marks: 6,
        command: "Classify + apply",
        markPlan: "Three options x (classification 1 + practical application 1).",
        answer: [
          "MAC-based NAC checks the connecting device's MAC address against an approved database and assigns the matching access/VLAN.",
          "Authentication-based NAC requires approved user credentials before the switch grants network access.",
          "Certificate-based NAC validates a trusted certificate installed on an organisation-managed device before granting the managed-device VLAN.",
        ],
        memory: "Device, person, proof.",
      },
      {
        label: "1(b)",
        prompt: "Apply multi-star, ring and cloud WAN topologies to different organisational needs.",
        marks: 6,
        command: "Apply",
        markPlan: "Three topologies x (suitable situation 1 + reason 1).",
        answer: [
          "Multi-star: connect branches to regional hubs when the company has several geographic regions; it reduces long links and limits one hub failure to its region.",
          "Ring: connect sites in a loop when an alternate direction is required; traffic can travel the other way after a link failure.",
          "Cloud: use a provider-managed WAN when many locations need flexible any-to-any connectivity without the company building every individual link.",
        ],
        memory: "Regions use stars, a ring goes around failure, a cloud lets the provider connect everyone.",
      },
      {
        label: "1(c)",
        prompt: "Apply two aspects of Internet connectivity in an Internet-access architecture.",
        marks: 4,
        command: "Apply",
        markPlan: "Two aspects x (name 1 + contextual explanation 1).",
        answer: [
          "Outbound access controls how employees and internal systems reach Internet services, normally through secured company exit points.",
          "Inbound access controls how external customers reach company-hosted services, using protected public endpoints such as firewalls, proxies or load balancers.",
        ],
        memory: "Users go out; customers come in.",
      },
    ],
  },
  {
    id: "feb26-q2",
    paper: "February 2026",
    chapter: 6,
    question: "Question 2",
    page: 5,
    subquestions: [
      {
        label: "2(a)",
        prompt: "Discuss two benefits of dividing a helpdesk into request, problem and installation groups.",
        marks: 4,
        command: "Discuss",
        markPlan: "Two benefits x (claim 1 + explanation 1).",
        answer: [
          "Specialisation improves speed and quality because each group develops the exact skills, scripts and tools for its request type.",
          "Management becomes easier because supervisors handle smaller, predictable workloads and can allocate staff and training according to each function.",
        ],
        memory: "Better expertise, easier management.",
      },
      {
        label: "2(b)",
        prompt: "Suggest one practical solution for an overloaded central helpdesk and explain the improvement.",
        marks: 4,
        command: "Suggest + explain",
        markPlan: "Name one solution, apply it to the scenario and explain at least two improvements.",
        answer: [
          "Divide the central helpdesk into specialised groups for new-service requests, problem reports and installations, each with an appropriate supervisor.",
          "Requests are routed directly to staff with the right skill, reducing queue delays and repeated hand-offs. Smaller focused teams also make workload, training and performance easier for supervisors to manage.",
        ],
      },
    ],
  },
  {
    id: "feb26-q3",
    paper: "February 2026",
    chapter: 7,
    question: "Question 3",
    page: 5,
    subquestions: [
      {
        label: "3(a)",
        prompt: "Describe two essential activities during the execution stage of a centralisation maintenance window.",
        marks: 4,
        command: "Describe",
        markPlan: "Two execution activities x (activity 1 + why/how 1).",
        answer: [
          "Disable or discourage user access, then shut services down in the approved dependency order so live activity cannot corrupt the migration.",
          "Carry out the master plan and run the assigned technical and end-to-end tests; reopen access only after success criteria are met, or trigger backout if they are not.",
        ],
        memory: "Control access, follow the plan, test before release.",
      },
      {
        label: "3(b)",
        prompt: "Compare decentralised and centralised IT, focusing on efficiency and security impact.",
        marks: 6,
        command: "Compare + analyse",
        markPlan: "Contrast current and target models, then analyse efficiency and security with scenario evidence.",
        answer: [
          "In the decentralised model, each department owns servers and applications, producing duplicated work and licences, inconsistent standards and uneven security controls.",
          "In the centralised model, one shared architecture and team standardise platforms, tools and procedures. This removes duplication, enables economies of scale, improves automation and makes support more efficient.",
          "Security improves because patching, authentication, authorisation, logging and data protection follow one policy and are easier to audit.",
          "However, the central platform has a larger failure impact, so it requires redundancy, capacity planning and controlled migration.",
        ],
        memory: "Decentralised repeats; centralised standardises.",
      },
      {
        label: "3(c)",
        prompt: "Evaluate a late-Friday maintenance window with one major benefit and one significant drawback.",
        marks: 4,
        command: "Evaluate",
        markPlan: "Give a judgement, one developed benefit, one developed drawback and a condition/recommendation.",
        answer: [
          "The choice is reasonable only if weekend staffing and rollback time are guaranteed.",
          "Benefit: normal user activity is low, so the planned outage disrupts fewer customers and leaves a longer recovery period before Monday.",
          "Drawback: engineers may be tired or unavailable late on Friday and specialist/vendor support may be limited over the weekend, increasing error and recovery risk.",
          "Schedule it only with rested staff, named escalation contacts, tested backout steps and a decision point early enough to recover.",
        ],
        memory: "Low customer impact can mean high staffing risk.",
      },
    ],
  },
  {
    id: "feb26-q4",
    paper: "February 2026",
    chapter: 8,
    question: "Question 4",
    page: 6,
    subquestions: [
      {
        label: "4(a)",
        prompt: "Describe three distinct reliability measures for a single email server.",
        marks: 6,
        command: "Describe",
        markPlan: "Three measures x (measure 1 + reliability effect 1).",
        answer: [
          "Deploy redundant email servers so another server can continue processing when the primary fails.",
          "Configure a backup Mail Exchange (MX) host to accept and queue inbound messages while the main mail system is unavailable.",
          "Use RAID plus redundant network interfaces and power supplies to tolerate individual disk, link or power-component failure.",
        ],
        memory: "Another server, another mail route, redundant components.",
      },
      {
        label: "4(b)",
        prompt: "Analyse horizontal and vertical scaling as strategies for slow web servers.",
        marks: 6,
        command: "Analyse difference",
        markPlan: "Define both lecture models, explain impact and state a trade-off/use case for each.",
        answer: [
          "Horizontal scaling replicates equivalent web servers behind a load balancer. It increases parallel capacity and availability, but requires load distribution and consistent shared state.",
          "Vertical scaling in these notes separates specialised layers, for example web, application and database services. Each layer can be tuned and scaled independently, but the architecture becomes more complex and a weak tier can remain a bottleneck.",
          "For holiday traffic, horizontal replicas quickly add request capacity; vertical separation is valuable when database or application processing needs different resources from the front end.",
        ],
        memory: "Horizontal copies; vertical layers.",
      },
    ],
  },
];

export const examMcqs: ExamMcq[] = [
  { id: "f25-5", paper: "February 2025", number: 5, chapter: 7, prompt: "Perform one task for all customers before moving to the next task.", answer: "Layers approach", reason: "The migration proceeds layer-by-layer across the whole customer population." },
  { id: "f25-6", paper: "February 2025", number: 6, chapter: 8, prompt: "A master continuously updates an equivalent standby that can take over without data loss.", answer: "Master plus hot spare", reason: "The spare is already synchronised and ready to assume service." },
  { id: "f25-8", paper: "February 2025", number: 8, chapter: 8, prompt: "What failure does RAID protect data from?", answer: "Hard disk failure", reason: "RAID does not undo deletion, fire or compromise; backup is still required." },
  { id: "f25-9", paper: "February 2025", number: 9, chapter: 8, prompt: "How does RAID 1 store data?", answer: "Mirroring", reason: "The same data is written to both disks." },
  { id: "j25-2", paper: "July 2025", number: 2, chapter: 7, prompt: "Why do companies centralise system administration?", answer: "Reduce cost through less redundancy and economies of scale", reason: "One shared team/platform avoids repeated work and duplicated infrastructure." },
  { id: "j25-9", paper: "July 2025", number: 9, chapter: 7, prompt: "Purpose of a kick-off meeting?", answer: "Agree on the service goal, timeline and budget", reason: "It aligns stakeholders before detailed delivery work." },
  { id: "f26-4", paper: "February 2026", number: 4, chapter: 6, prompt: "A written policy defines services, customers, availability and locations.", answer: "Scope of support policy", reason: "It defines the boundaries and expectations of helpdesk coverage." },
  { id: "f26-5", paper: "February 2026", number: 5, chapter: 6, prompt: "Which tool assigns ticket priority, logs requests and gathers feedback?", answer: "Request-tracking software", reason: "Those are its core queue-management and reporting functions." },
  { id: "f26-6", paper: "February 2026", number: 6, chapter: 6, prompt: "How should an overloaded mixed-task helpdesk be reorganised?", answer: "Divide it into specialised request, problem and installation groups", reason: "Specialisation improves skill matching and supervision." },
  { id: "f26-7", paper: "February 2026", number: 7, chapter: 7, prompt: "Primary function of a CRB?", answer: "Coordinate and control business-required changes", reason: "The CRB reviews and governs changes; it does not personally execute them." },
  { id: "f26-8", paper: "February 2026", number: 8, chapter: 7, prompt: "Urgent critical-server patch that cannot wait.", answer: "Emergency update", reason: "Urgency and immediate threat make it unable to wait for the normal CRB cycle." },
  { id: "f26-9", paper: "February 2026", number: 9, chapter: 8, prompt: "Primary purpose of monitoring historical trends?", answer: "Capacity planning and long-term anomaly detection", reason: "Immediate notifications belong to real-time monitoring." },
  { id: "f26-10", paper: "February 2026", number: 10, chapter: 8, prompt: "Add three identical web servers behind a load balancer.", answer: "Horizontal scaling", reason: "Equivalent resources are replicated and requests are divided among them." },
];

export const recallCards: RecallCard[] = [
  { id: "r5-physical", chapter: 5, prompt: "Differentiate a physical network from a logical network.", answer: "Physical means the actual wires and devices. Logical means the software-based partitions, segments and connections placed over that equipment.", examUpgrade: "Add that VLANs divide one physical infrastructure into separate logical LAN segments." },
  { id: "r5-nac", chapter: 5, prompt: "Name the three NAC options and what each one checks.", answer: "MAC-based checks a device address; authentication-based checks user credentials; certificate-based checks a trusted device certificate.", examUpgrade: "Finish by stating that NAC grants access and selects the appropriate VLAN." },
  { id: "r5-star", chapter: 5, prompt: "What is wrong with a star WAN and what fixes it?", answer: "The central hub is a single point of failure. A dual-star adds a second hub and alternate paths.", examUpgrade: "Say what happens: all branches lose connectivity when the only central site fails." },
  { id: "r5-capacity", chapter: 5, prompt: "Recite the six datacentre capacity resources.", answer: "Space, power, cooling, wiring, network ports and console ports.", examUpgrade: "Explain that an accurate inventory tracks occupied, reserved and free capacity." },
  { id: "r5-monitor", chapter: 5, prompt: "What should basic network monitoring observe?", answer: "Device health, internal components, resource utilisation, and WAN/LAN link health, utilisation and error counts.", examUpgrade: "Tie visibility to action: monitoring reveals degradation before customers report it." },
  { id: "r5-internet", chapter: 5, prompt: "What are the two aspects of Internet connectivity?", answer: "Outbound access for employees reaching Internet services, and inbound access for external users reaching company services.", examUpgrade: "Use direction words explicitly: internal-to-external and external-to-internal." },
  { id: "r6-groups", chapter: 6, prompt: "Name the three specialised helpdesk groups.", answer: "New-service requests, problem reports and installations.", examUpgrade: "Add the benefit: focused skills and smaller groups improve response and supervision." },
  { id: "r6-tracking", chapter: 6, prompt: "What does request-tracking software do?", answer: "Assigns priority and ownership, records history, exposes common issues and gathers customer-satisfaction data.", examUpgrade: "State the operational result: no request is lost and supervisors can manage workload." },
  { id: "r6-incident", chapter: 6, prompt: "Name the four incident-handling phases.", answer: "Greeting, problem identification, planning and execution, then verification and closing.", examUpgrade: "If marks allow, expand them into the nine steps." },
  { id: "r6-escalation", chapter: 6, prompt: "Why use tiered escalation?", answer: "First line handles most routine calls while difficult issues move to staff with deeper expertise.", examUpgrade: "Quote the lecture target: first line should resolve about 80-90% of calls." },
  { id: "r6-scope", chapter: 6, prompt: "What must a scope-of-support policy define?", answer: "What, who, where and when support applies, how to request help and the expected completion time.", examUpgrade: "Connect it to the problem: clear scope prevents ad hoc interruption and expectation disputes." },
  { id: "r6-fix", chapter: 6, prompt: "Differentiate a temporary fix from a permanent fix.", answer: "A temporary fix restores service under current constraints; a permanent fix removes the root cause and prevents recurrence.", examUpgrade: "Say that temporary repairs must be recorded and scheduled for follow-up." },
  { id: "r7-class", chapter: 7, prompt: "Classify routine, major, sensitive and emergency changes.", answer: "Routine is safe with no expected outage; major affects many systems or plans a significant outage; sensitive plans no outage but is large and risky; emergency cannot wait.", examUpgrade: "Classify by outage, breadth, risk and urgency - not by command difficulty." },
  { id: "r7-plan", chapter: 7, prompt: "Name the five parts of a complete technical plan.", answer: "Change process, testing documentation, success criteria, backout plan and decision point.", examUpgrade: "Distinguish the last two: the backout plan says how; the decision point says when." },
  { id: "r7-crb", chapter: 7, prompt: "What does each tiered CRB level review?", answer: "Level 1 checks technical planning/testing; Level 2 checks wider IT impact; Level 3 reviews high-risk work against business and IT needs.", examUpgrade: "Show the increasing scope: technical, enterprise IT, then business plus IT." },
  { id: "r7-window", chapter: 7, prompt: "Name the three maintenance-window stages.", answer: "Preparation, execution and resolution.", examUpgrade: "Add one action each: master plan; controlled work and tests; announce completion and restore access." },
  { id: "r7-central", chapter: 7, prompt: "Why centralise a service?", answer: "To reduce duplicated work and cost, standardise architecture and security, and improve automation, support and service quality.", examUpgrade: "Balance the answer by noting the larger impact of a central failure and need for redundancy." },
  { id: "r7-migrate", chapter: 7, prompt: "What are the seven centralisation steps?", answer: "Understand, plan, gain support, fix causes, provide excellence, start slowly and take easy wins.", examUpgrade: "Apply it: migrate a tolerant pilot group before high-risk users." },
  { id: "r8-monitor", chapter: 8, prompt: "Differentiate real-time and historical monitoring.", answer: "Real time detects current conditions for immediate response; historical monitoring stores trends for capacity planning and anomaly detection.", examUpgrade: "Use the contrast: what is broken now versus what is changing over time." },
  { id: "r8-namespace", chapter: 8, prompt: "What three namespace decisions must be clear?", answer: "Scope, consistency and authority.", examUpgrade: "Explain authority as the service that owns the master value for an attribute." },
  { id: "r8-email", chapter: 8, prompt: "Name the five parts of email.", answer: "MTA transport, MDA delivery/storage, POP3 or IMAP4 access for the MUA, list processing, and spam/malware filtering.", examUpgrade: "Describe the flow rather than only expanding the abbreviations." },
  { id: "r8-storage", chapter: 8, prompt: "Recite the storage-management list.", answer: "Assess needs, assign groups to infrastructure, maintain inventory/spares, plan growth and standardise.", examUpgrade: "Introduce storage as a shared community resource." },
  { id: "r8-restore", chapter: 8, prompt: "Give the three reasons to restore data.", answer: "Accidental deletion, rebuilding after disk failure, and retrieving an archival snapshot for disaster, legal or fiduciary needs.", examUpgrade: "Do not claim RAID handles all three; RAID is not a backup." },
  { id: "r8-scale", chapter: 8, prompt: "Differentiate horizontal and vertical scaling in these slides.", answer: "Horizontal replicates equivalent resources; vertical separates different subservices into layers.", examUpgrade: "For horizontal scaling, mention a load balancer and shared database." },
];

export const sequenceGames: SequenceGame[] = [
  { chapter: 5, title: "Datacentre capacity lock-in", instruction: "Tap all six resources in the lecture order.", items: ["Space", "Power", "Cooling", "Wiring", "Network ports", "Console ports"] },
  { chapter: 6, title: "Nine-step incident relay", instruction: "Build the complete customer-request process from greeting to closing.", items: ["Greeting", "Problem classification", "Problem statement", "Problem verification", "Solution proposals", "Solution selection", "Execution", "Craft verification", "Customer verification & closing"] },
  { chapter: 7, title: "Technical-plan chain", instruction: "Tap the five plan parts in the memorised sequence.", items: ["Change process", "Testing documentation", "Success criteria", "Backout plan", "Decision point"] },
  { chapter: 8, title: "Storage-management lock-in", instruction: "Build the five-word answer that your chat identified as a weak spot.", items: ["Assess", "Assign", "Inventory", "Plan", "Standardise"] },
];
