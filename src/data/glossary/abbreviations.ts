const abbreviations: Record<string, string> = {
  AAA: "Authentication, Authorization and Accounting",
  AD: "Active Directory",
  ATS: "Automatic Transfer Switch",
  BYOD: "Bring Your Own Device",
  CapEx: "Capital Expenditure",
  CDP: "Continuous Data Protection",
  CGI: "Common Gateway Interface",
  CIO: "Chief Information Officer",
  CMDB: "Configuration Management Database",
  CPU: "Central Processing Unit",
  CRB: "Change Review Board",
  DAD: "Disk Access Density",
  DAS: "Direct-Attached Storage",
  DC: "Domain Controller",
  DHCP: "Dynamic Host Configuration Protocol",
  DLP: "Data Leakage Prevention",
  DNS: "Domain Name System",
  EBGP: "External Border Gateway Protocol",
  EIGRP: "Enhanced Interior Gateway Routing Protocol",
  FAQ: "Frequently Asked Questions",
  HA: "High Availability",
  HBA: "Host Bus Adapter",
  IaaS: "Infrastructure as a Service",
  IDF: "Intermediate Distribution Frame",
  IMAP4: "Internet Message Access Protocol version 4",
  IoT: "Internet of Things",
  IP: "Internet Protocol",
  IPv4: "Internet Protocol version 4",
  IPv6: "Internet Protocol version 6",
  KVM: "Keyboard, Video and Mouse",
  L1: "Level 1 support - the first response tier",
  L2: "Level 2 support - specialist technical support",
  L3: "Level 3 support - subject-matter expert support",
  LAN: "Local Area Network",
  LDAP: "Lightweight Directory Access Protocol",
  LOM: "Lights-Out Management",
  MAC: "Media Access Control",
  MDA: "Mail Delivery Agent",
  MDF: "Main Distribution Frame",
  MTA: "Mail Transfer Agent",
  MUA: "Mail User Agent",
  MX: "Mail Exchange",
  NAC: "Network Access Control",
  NAS: "Network-Attached Storage",
  NIC: "Network Interface Card",
  NOC: "Network Operations Centre",
  OpEx: "Operating Expenditure",
  OS: "Operating System",
  OSI: "Open Systems Interconnection",
  OSPF: "Open Shortest Path First",
  POP3: "Post Office Protocol version 3",
  RAID: "Redundant Array of Independent Disks",
  RADIUS: "Remote Authentication Dial-In User Service",
  RANCID: "Really Awesome New Cisco confIg Differ",
  SA: "System Administrator",
  SAN: "Storage Area Network",
  SaaS: "Software as a Service",
  SDN: "Software-Defined Networking",
  SLA: "Service-Level Agreement",
  SME: "Subject-Matter Expert",
  SSID: "Service Set Identifier",
  "TACACS+": "Terminal Access Controller Access-Control System Plus",
  TCP: "Transmission Control Protocol",
  TLS: "Transport Layer Security",
  TOR: "Top of Rack",
  UPS: "Uninterruptible Power Supply",
  VLAN: "Virtual Local Area Network",
  VoIP: "Voice over Internet Protocol",
  VPN: "Virtual Private Network",
  WAN: "Wide Area Network",
  "Wi-Fi": "Wireless local-area networking technology",
};

export function expandTerm(term: string) {
  const exact = abbreviations[term] ?? abbreviations[term.replace(/s$/i, "")];
  if (exact) return exact;

  const shortform = Object.keys(abbreviations)
    .sort((a, b) => b.length - a.length)
    .find((key) => {
      const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(^|[^A-Za-z0-9])${escaped}([^A-Za-z0-9]|$)`).test(
        term,
      );
    });

  return shortform
    ? `${shortform}: ${abbreviations[shortform]}`
    : undefined;
}

export function glossaryDefinition(term: string, fallback: string) {
  const expansion = expandTerm(term);
  return expansion ? `${expansion}. ${fallback}` : fallback;
}
