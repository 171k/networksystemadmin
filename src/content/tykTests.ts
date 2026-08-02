export type TYKQuestion = {
  id: string;
  chapter: number;
  kind: "Recall" | "Understanding" | "Application";
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type TYKTest = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  questions: TYKQuestion[];
};

const Q = (
  id: string,
  chapter: number,
  kind: TYKQuestion["kind"],
  prompt: string,
  options: string[],
  answer: string,
  explanation: string,
): TYKQuestion => ({ id, chapter, kind, prompt, options, answer, explanation });

export const tykTests: TYKTest[] = [
  {
    id: "tyk-1",
    number: 1,
    title: "Core Foundations",
    subtitle: "Essential definitions and high-frequency facts from every chapter.",
    difficulty: "Foundation",
    questions: [
      Q("t1q1", 5, "Understanding", "Which statement correctly distinguishes a physical network from a logical network?", [
        "A physical network is the actual equipment and wiring; a logical network is the software-based segmentation over it.",
        "A physical network connects offices; a logical network only connects datacentres.",
        "A physical network uses IPv4; a logical network uses IPv6.",
        "A physical network is wired; a logical network is always wireless.",
      ], "A physical network is the actual equipment and wiring; a logical network is the software-based segmentation over it.", "Switches, cables and ports are physical. VLANs, subnets and routing relationships are logical structures placed over that equipment."),
      Q("t1q2", 5, "Recall", "Which set contains the three Network Access Control (NAC) options taught in Chapter 5?", [
        "Password-based, biometric-based and location-based",
        "MAC-based, authentication-based and certificate-based",
        "Static, dynamic and hybrid",
        "Local, regional and cloud-based",
      ], "MAC-based, authentication-based and certificate-based", "The memory pattern is device, person, proof: MAC address, user credentials and trusted device certificate."),
      Q("t1q3", 5, "Understanding", "Why is a wired office connection normally more reliable than Wi-Fi?", [
        "It automatically encrypts all application data.",
        "It never requires a network switch.",
        "Its physical connection is not affected by radio interference.",
        "It can connect without an IP address.",
      ], "Its physical connection is not affected by radio interference.", "The lecture advantages of wired networking are reliability, speed and predictable latency; wireless mainly adds mobility."),
      Q("t1q4", 6, "Recall", "A written policy states what is supported, who is supported, where and when support is available. What is it?", [
        "Change-freeze policy",
        "Scope-of-support policy",
        "Backout policy",
        "Acceptable-use policy",
      ], "Scope-of-support policy", "Scope of support defines the service boundary, supported customers and locations, support hours, access method and expected completion time."),
      Q("t1q5", 6, "Understanding", "What is the main purpose of tiered helpdesk escalation?", [
        "Make every ticket pass through all support tiers.",
        "Allow customers to choose the most senior engineer.",
        "Match difficult issues to deeper expertise while first line resolves routine calls.",
        "Separate support staff by working hours only.",
      ], "Match difficult issues to deeper expertise while first line resolves routine calls.", "First-line staff should solve roughly 80-90% of calls; only complex or specialist problems move higher."),
      Q("t1q6", 7, "Application", "An urgent security patch cannot wait for the next Change Review Board meeting. How should it be classified?", [
        "Sensitive update",
        "Routine update",
        "Major update",
        "Emergency update",
      ], "Emergency update", "Emergency changes cannot wait for the normal CRB cycle. They may receive limited approval first and full review later."),
      Q("t1q7", 7, "Recall", "Which item does NOT belong in the five-part technical change plan?", [
        "Success criteria",
        "Customer satisfaction survey",
        "Backout plan",
        "Decision point",
      ], "Customer satisfaction survey", "The five parts are change process, testing documentation, success criteria, backout plan and decision point."),
      Q("t1q8", 8, "Understanding", "Which monitoring type is primarily used for capacity planning and long-term anomaly detection?", [
        "Real-time monitoring",
        "Historical monitoring",
        "Emergency monitoring",
        "Transaction blocking",
      ], "Historical monitoring", "Real-time monitoring reports what is happening now; historical trends show growth and abnormal behaviour over time."),
      Q("t1q9", 8, "Recall", "Which component transports email from one mail server to another?", [
        "Mail Delivery Agent (MDA)",
        "Mail User Agent (MUA)",
        "Mail Transfer Agent (MTA)",
        "Internet Message Access Protocol (IMAP)",
      ], "Mail Transfer Agent (MTA)", "The MTA handles server-to-server transport. The MDA performs final delivery, while POP3/IMAP provides user access."),
      Q("t1q10", 8, "Understanding", "According to these lecture notes, what does horizontal web scaling mean?", [
        "Adding CPU and memory to one server",
        "Separating web, application and database layers",
        "Replicating equivalent web servers and dividing requests among them",
        "Moving all content to one larger database",
      ], "Replicating equivalent web servers and dividing requests among them", "Horizontal scaling uses copies of the same resource, normally behind a load balancer."),
    ],
  },
  {
    id: "tyk-2",
    number: 2,
    title: "Scenario Application",
    subtitle: "Choose the best design or process for realistic IT situations.",
    difficulty: "Intermediate",
    questions: [
      Q("t2q1", 5, "Application", "All branches connect only to one central datacentre. Which risk is created by this star WAN?", [
        "Every branch must use the same subnet.",
        "The central location becomes a single point of failure.",
        "Traffic cannot be encrypted between sites.",
        "The branches cannot use dynamic routing.",
      ], "The central location becomes a single point of failure.", "If the only hub fails, every branch loses connectivity. A dual-star adds a second central path."),
      Q("t2q2", 5, "Application", "A branch needs predictable normal performance but also a low-cost backup connection. Which design fits best?", [
        "Two unrelated guest Wi-Fi networks",
        "A dedicated line backed up by an Internet VPN",
        "One Internet VPN with no alternate path",
        "A static route through the office LAN",
      ], "A dedicated line backed up by an Internet VPN", "The dedicated path provides contracted performance; the VPN supplies economical redundancy."),
      Q("t2q3", 5, "Understanding", "Why should strongly separated datacentre security zones use different physical devices instead of only VLANs on one device?", [
        "Physical separation reduces the shared-device failure and compromise boundary.",
        "VLANs cannot carry IP traffic.",
        "Physical devices do not require configuration.",
        "Separate devices make all routing static.",
      ], "Physical separation reduces the shared-device failure and compromise boundary.", "Placing sensitive zones on the same hardware creates a common failure or compromise point even if VLANs are configured."),
      Q("t2q4", 6, "Application", "A helpdesk loses urgent tickets and cannot measure repeated problems. Which tool directly addresses both issues?", [
        "A network topology mapper",
        "Request-tracking software",
        "A configuration backup tool",
        "A software repository",
      ], "Request-tracking software", "Ticket priority protects urgent work, while request history and statistics expose repeated issues and trends."),
      Q("t2q5", 6, "Understanding", "Why should an organisation define an emergency in writing?", [
        "To guarantee that every complaint receives top priority",
        "To remove management from priority decisions",
        "To apply priority consistently and resolve disputes using an agreed business definition",
        "To allow only senior staff to submit tickets",
      ], "To apply priority consistently and resolve disputes using an agreed business definition", "The policy helps administrators push back on false emergencies and lets management own business priorities."),
      Q("t2q6", 7, "Application", "A change has a low probability of failure but could stop every company service. Which statement is best?", [
        "It must be low risk because failure is unlikely.",
        "Its high impact can still make the overall risk high.",
        "Only outage duration affects its risk rating.",
        "Risk cannot be rated until after implementation.",
      ], "Its high impact can still make the overall risk high.", "Risk combines likelihood with potential impact. Catastrophic impact can justify a high rating even when likelihood is lower."),
      Q("t2q7", 7, "Application", "During a maintenance window, when should customer access be restored?", [
        "Immediately after the first server starts",
        "Before end-to-end testing to save time",
        "After planned work and assigned tests meet the success criteria",
        "Only after the next CRB meeting",
      ], "After planned work and assigned tests meet the success criteria", "Execution includes controlled work and testing. Resolution restores access only after the service is verified."),
      Q("t2q8", 8, "Understanding", "How does DNS anycast improve resolver resilience?", [
        "It stores every DNS zone on the client.",
        "It routes one shared address to a suitable advertising server and can shift after failure.",
        "It converts dynamic records into static records.",
        "It removes the need for multiple DNS servers.",
      ], "It routes one shared address to a suitable advertising server and can shift after failure.", "Routers choose among servers advertising the same anycast address, making failover independent of changing client settings."),
      Q("t2q9", 8, "Application", "The primary email server is unavailable. Which measure specifically continues accepting inbound mail?", [
        "A backup Mail Exchange (MX) host",
        "A larger user mailbox quota",
        "A second Mail User Agent",
        "A controlled software mirror",
      ], "A backup Mail Exchange (MX) host", "A backup MX accepts and queues incoming mail until the primary service is available."),
      Q("t2q10", 8, "Understanding", "Why is RAID not a complete backup strategy?", [
        "RAID cannot improve service availability.",
        "RAID works only with solid-state drives.",
        "Deletion or corruption can be copied across the array, so an earlier independent copy is still required.",
        "RAID prevents files from being restored individually.",
      ], "Deletion or corruption can be copied across the array, so an earlier independent copy is still required.", "RAID helps a service continue after supported disk failure. Backup provides recovery to an earlier or separate copy."),
    ],
  },
  {
    id: "tyk-3",
    number: 3,
    title: "Processes & Sequences",
    subtitle: "Lock in the ordered lists most likely to earn direct marks.",
    difficulty: "Intermediate",
    questions: [
      Q("t3q1", 5, "Recall", "Which sequence correctly begins the network-device lifecycle?", [
        "Installed, assigned, in stock, operational",
        "In stock, assigned, installed, deploying",
        "Assigned, operational, installed, servicing",
        "Deploying, in stock, installed, disposed",
      ], "In stock, assigned, installed, deploying", "The full lifecycle is in stock, assigned, installed, deploying, operational, servicing, decommissioning and disposed."),
      Q("t3q2", 5, "Recall", "Which list contains only datacentre capacity resources?", [
        "Space, power, cooling, wiring, network ports, console ports",
        "Users, passwords, tickets, licences, mailboxes, printers",
        "Risk, impact, likelihood, backout, approval, closure",
        "CPU, applications, customers, policies, vendors, contracts",
      ], "Space, power, cooling, wiring, network ports, console ports", "Capacity management tracks physical space and the supporting power, cooling and connection resources."),
      Q("t3q3", 6, "Recall", "Which sequence correctly names the four incident-handling phases?", [
        "Classify, approve, deploy, document",
        "Greeting, problem identification, planning and execution, verification and closing",
        "Request, review, execute, backout",
        "Monitor, alert, escalate, archive",
      ], "Greeting, problem identification, planning and execution, verification and closing", "The short memory is greet, identify, fix, verify."),
      Q("t3q4", 6, "Recall", "What occurs immediately after problem classification in the nine-step customer-request process?", [
        "Solution selection",
        "Craft verification",
        "Problem statement",
        "Execution",
      ], "Problem statement", "The early sequence is greeting, classification, statement and verification."),
      Q("t3q5", 6, "Understanding", "A manual log deletion restores disk space today, while automatic rotation prevents recurrence. How should these be classified?", [
        "Both are permanent fixes.",
        "Manual deletion is permanent; rotation is temporary.",
        "Manual deletion is temporary; rotation is permanent.",
        "Both are only workarounds and should be removed.",
      ], "Manual deletion is temporary; rotation is permanent.", "A temporary fix restores service under current constraints. A permanent fix addresses the cause and prevents recurrence."),
      Q("t3q6", 7, "Recall", "Which order correctly describes the scope of the three CRB tiers?", [
        "Business strategy, customer support, technical testing",
        "Technical review, wider IT management review, business-and-IT high-risk review",
        "Vendor review, finance review, legal review",
        "Routine review, emergency review, post-change review",
      ], "Technical review, wider IT management review, business-and-IT high-risk review", "Scope grows upward from technology-specific correctness to enterprise IT impact and then business coordination."),
      Q("t3q7", 7, "Recall", "What are the three maintenance-window stages?", [
        "Request, approve, reject",
        "Build, test, dispose",
        "Preparation, execution, resolution",
        "Detection, escalation, closure",
      ], "Preparation, execution, resolution", "Preparation creates the plan, execution performs and tests the work, and resolution restores access and announces the outcome."),
      Q("t3q8", 7, "Recall", "Which activity comes first when centralising an existing service?", [
        "Migrate every customer immediately.",
        "Understand the current solution and why it became decentralised.",
        "Remove all local support staff.",
        "Purchase the largest possible central platform.",
      ], "Understand the current solution and why it became decentralised.", "You must understand features, users, weaknesses and causes before designing the target and migration."),
      Q("t3q9", 8, "Recall", "Which storage-management sequence matches the memorisation list?", [
        "Assess, assign, inventory, plan, standardise",
        "Monitor, classify, escalate, restore, close",
        "Purchase, mirror, encrypt, delete, replace",
        "Name, route, authenticate, transport, filter",
      ], "Assess, assign, inventory, plan, standardise", "Assess needs, map groups to infrastructure, maintain inventory/spares, plan growth and set standards."),
      Q("t3q10", 8, "Recall", "Which set gives the three main reasons for restoring data?", [
        "High utilisation, congestion and latency",
        "Deletion, disk failure and archival retrieval",
        "Spam, malware and open relay",
        "Migration, testing and change freeze",
      ], "Deletion, disk failure and archival retrieval", "Restore operations recover an accidentally deleted file, rebuild after disk failure or retrieve a dated archival snapshot."),
    ],
  },
  {
    id: "tyk-4",
    number: 4,
    title: "Compare & Troubleshoot",
    subtitle: "Distinguish close concepts and diagnose the stronger answer.",
    difficulty: "Advanced",
    questions: [
      Q("t4q1", 5, "Understanding", "What is a key trade-off of top-of-rack switching compared with one central datacentre switch?", [
        "It eliminates all switch uplink limits.",
        "It reduces rack-level cabling, but increases switch count and depends on rack uplinks.",
        "It prevents servers from using redundant links.",
        "It requires every rack to use a different routing protocol.",
      ], "It reduces rack-level cabling, but increases switch count and depends on rack uplinks.", "TOR places switching in each rack. Dual TORs improve resilience, while uplink capacity can still limit traffic leaving the rack."),
      Q("t4q2", 5, "Understanding", "Which example represents inbound Internet access?", [
        "An employee opens an external documentation website.",
        "A branch connects to headquarters through a VPN.",
        "An external customer reaches the company's public web application.",
        "A router downloads a firmware update.",
      ], "An external customer reaches the company's public web application.", "Inbound means the company makes its services available to external users. Outbound means internal users reach Internet services."),
      Q("t4q3", 5, "Understanding", "Which practice provides attribution and recovery for network-device configuration changes?", [
        "Central audit logs plus versioned configuration backups or snapshots",
        "Disabling all monitoring alerts during updates",
        "Using one shared administrator account",
        "Keeping the only configuration copy on the device",
      ], "Central audit logs plus versioned configuration backups or snapshots", "Attributable logs show who changed what, while configuration history preserves the earlier known-good state."),
      Q("t4q4", 6, "Understanding", "How does successive refinement differ from process of elimination?", [
        "Refinement adds components step by step; elimination removes or bypasses parts until the fault disappears.",
        "Refinement is for hardware only; elimination is for software only.",
        "Refinement restarts the service; elimination replaces the service.",
        "Refinement uses monitoring; elimination never uses tools.",
      ], "Refinement adds components step by step; elimination removes or bypasses parts until the fault disappears.", "Both isolate a cause, but they approach it in opposite directions: build upward versus remove downward."),
      Q("t4q5", 6, "Application", "A service repeatedly fills its disk with logs. Which action addresses the root cause?", [
        "Delete the largest log manually each week.",
        "Restart the server whenever the disk fills.",
        "Implement tested log rotation with retention and monitoring.",
        "Tell users to create fewer support tickets.",
      ], "Implement tested log rotation with retention and monitoring.", "Manual deletion treats the symptom. Rotation controls growth permanently and monitoring verifies the result."),
      Q("t4q6", 7, "Understanding", "Which statement correctly describes a distributed service model?", [
        "Every division independently designs and operates its own unrelated service.",
        "One central platform runs every instance from one location only.",
        "A central standard is deployed at multiple locations and managed centrally.",
        "External vendors own all service policies and data.",
      ], "A central standard is deployed at multiple locations and managed centrally.", "Centralised means one shared platform, decentralised means independent division designs, and distributed means centrally standardised regional instances."),
      Q("t4q7", 7, "Understanding", "What is the main advantage of building a new server and migrating clients instead of upgrading in place?", [
        "The old service can remain available as a tested fallback during migration.",
        "No compatibility testing is required.",
        "The new server never needs a backout plan.",
        "Customers do not need to be informed.",
      ], "The old service can remain available as a tested fallback during migration.", "A parallel new build can be tested before client movement and preserves the old host as a rollback option."),
      Q("t4q8", 8, "Understanding", "Which pair correctly contrasts real-time and historical monitoring?", [
        "Real time plans capacity; historical monitoring pages the on-call engineer immediately.",
        "Real time detects current conditions; historical monitoring identifies trends and long-term abnormalities.",
        "Real time stores archives; historical monitoring blocks malicious traffic.",
        "Real time is centralised; historical monitoring must be decentralised.",
      ], "Real time detects current conditions; historical monitoring identifies trends and long-term abnormalities.", "Use the memory contrast: what is broken now versus what is changing over time."),
      Q("t4q9", 8, "Understanding", "In namespace governance, what does authority mean?", [
        "The maximum number of names the system can store",
        "The master service that owns the official value of an attribute",
        "The network path used to query a name",
        "The period before a name can be reused",
      ], "The master service that owns the official value of an attribute", "For example, HR may be authoritative for employment status and drive updates to authentication and email."),
      Q("t4q10", 8, "Understanding", "According to the lecture's web-service model, which statement is correct?", [
        "Horizontal scaling separates roles; vertical scaling duplicates whole servers.",
        "Horizontal scaling duplicates equivalent resources; vertical scaling separates specialised service layers.",
        "Both terms mean adding CPU and RAM to one machine.",
        "Vertical scaling requires every layer to use a separate database.",
      ], "Horizontal scaling duplicates equivalent resources; vertical scaling separates specialised service layers.", "This course uses vertical for the web, application and database service layers, not the common add-CPU definition."),
    ],
  },
  {
    id: "tyk-5",
    number: 5,
    title: "Final Mixed Challenge",
    subtitle: "Exam-style traps combining memorisation with scenario judgement.",
    difficulty: "Advanced",
    questions: [
      Q("t5q1", 5, "Application", "A company laptop presents a trusted digital identity before receiving the managed-device VLAN. Which NAC method is being used?", [
        "MAC-based NAC",
        "Authentication-based NAC",
        "Certificate-based NAC",
        "Guest portal NAC",
      ], "Certificate-based NAC", "A certificate provides trusted proof that the device is organisation-managed. A MAC address alone is easier to imitate."),
      Q("t5q2", 5, "Application", "A global company wants provider-managed any-to-any connectivity among many offices without designing every direct link. Which WAN topology fits best?", [
        "Single star",
        "Ring",
        "Cloud topology",
        "One large office subnet",
      ], "Cloud topology", "A provider cloud abstracts the internal interconnection and flexibly connects many sites."),
      Q("t5q3", 5, "Application", "A medium company wants its own servers but does not want to build a facility, power or cooling plant. Which option is most suitable?", [
        "Build a purpose-built datacentre",
        "Rent colocation space",
        "Place the servers in a telecom patch room",
        "Use personal desktop machines as servers",
      ], "Rent colocation space", "Colocation supplies suitable facility space and infrastructure while the company retains its own server equipment."),
      Q("t5q4", 6, "Application", "A supervisor manages one huge team handling account requests, failures and physical installations. What is the best first redesign?", [
        "Train every employee to do every task equally.",
        "Create specialised request, problem and installation groups with suitable supervision.",
        "Remove the ticket system and accept direct messages.",
        "Escalate every request to engineering.",
      ], "Create specialised request, problem and installation groups with suitable supervision.", "Specialisation improves skill matching, queue speed and management while one tracking system preserves coordination."),
      Q("t5q5", 6, "Understanding", "Which use of long-term helpdesk statistics is most valuable for planning?", [
        "Predicting support workload and cost for a new service from earlier ticket trends",
        "Automatically approving every emergency request",
        "Replacing identity verification during password resets",
        "Preventing all future software defects",
      ], "Predicting support workload and cost for a new service from earlier ticket trends", "Trends in call volume, types, technologies and satisfaction justify budgets and forecast staffing needs."),
      Q("t5q6", 7, "Application", "A large firewall change plans no outage but could accidentally disconnect users. Which classification is most precise?", [
        "Routine update",
        "Major update",
        "Sensitive update",
        "Emergency update",
      ], "Sensitive update", "Sensitive changes have no planned outage but are large enough to create meaningful accidental-outage risk."),
      Q("t5q7", 7, "Application", "What is the strongest evaluation of scheduling a risky change late Friday night?", [
        "It is always best because no customers work on weekends.",
        "It is always wrong because maintenance must occur during office hours.",
        "It reduces customer disruption but is acceptable only with rested staff, specialist coverage and enough rollback time.",
        "It removes the need for a decision point.",
      ], "It reduces customer disruption but is acceptable only with rested staff, specialist coverage and enough rollback time.", "Good evaluation balances lower business activity against fatigue, unavailable expertise and weekend recovery risk."),
      Q("t5q8", 8, "Understanding", "Why are backups strong candidates for centralisation?", [
        "They are unimportant and require no specialist equipment.",
        "They are important and expensive, so standards and investment can be shared across systems.",
        "Centralisation makes restore testing unnecessary.",
        "A central backup automatically prevents every disaster.",
      ], "They are important and expensive, so standards and investment can be shared across systems.", "Centralisation spreads hardware, media, software and specialist staff cost while improving policy consistency and restore control."),
      Q("t5q9", 8, "Application", "HR owns employment status, while authentication and email copy that value. Which namespace principle does this demonstrate?", [
        "Name lifetime",
        "Theme-based naming",
        "Authoritative source",
        "Packet prioritisation",
      ], "Authoritative source", "HR is the master authority. Dependent services should update from it rather than invent conflicting status values."),
      Q("t5q10", 8, "Application", "Users alternate between three load-balanced web servers. Why should the servers use a shared database?", [
        "To ensure every server sees the same consistent application state",
        "To make the load balancer unnecessary",
        "To force every request through only one web server",
        "To convert horizontal scaling into a backup system",
      ], "To ensure every server sees the same consistent application state", "Without shared state, successive requests can reach different replicas and show conflicting accounts, scores, orders or transactions."),
    ],
  },
];
