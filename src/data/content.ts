export const profile = {
  name: "Bijoy Raju",
  role: "Senior Flutter Developer",
  email: import.meta.env.VITE_CONTACT_EMAIL || "bijoyraju66@gmail.com",
  phone: "+91 9846284412",
  phoneHref: "tel:+919846284412",
  socials: {
    GitHub: import.meta.env.VITE_GITHUB_URL || "https://github.com/BijoyRaju",
    LinkedIn:
      import.meta.env.VITE_LINKEDIN_URL ||
      "https://www.linkedin.com/in/bijoy-raju/",
  } as Record<string, string | undefined>,
};
export const navigation = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];
export const skills = [
  { name: "Flutter", category: "Mobile", icon: "flutter", color: "#55c4ff" },
  { name: "Dart", category: "Mobile", icon: "dart", color: "#37c9e8" },
  { name: "Firebase", category: "Backend", icon: "firebase", color: "#ffca50" },
  { name: "Python", category: "Data", icon: "python", color: "#f1c34b" },
  { name: "SQL", category: "Data", icon: "database", color: "#58b6fc" },
  {
    name: "Oracle APEX",
    category: "Backend",
    icon: "oracle",
    color: "#ff615e",
  },
  { name: "React", category: "Mobile", icon: "react", color: "#62dafb" },
  { name: "Swift", category: "Mobile", icon: "swift", color: "#fa8853" },
  { name: "Git", category: "Tools", icon: "git", color: "#ff795a" },
  { name: "Node.js", category: "Backend", icon: "node", color: "#82c86d" },
  { name: "Figma", category: "Tools", icon: "figma", color: "#fc8a78" },
  { name: "Go", category: "Backend", icon: "go", color: "#5ac9dc" },
];
export const projects = [
  {
    id: "dazzles",
    title: "Dazzles",
    category: "Mobile",
    label: "INVENTORY & OPERATIONS",
    description:
      "Products, inventory, and daily operations. A focused workspace for the Dazzles team.",
    stack: ["Flutter", "Inventory", "Mobile"],
    url:
      import.meta.env.VITE_DAZZLES_URL ||
      "https://play.google.com/store/apps/details?id=com.dazzles.app&hl=en_IN",
    detail:
      "An internal product and inventory management application for authorized Dazzles users. It helps the team organize products, track inventory, and streamline everyday operations.",
  },
  {
    id: "pizza",
    title: "The London Neapolitan Pizzeria",
    category: "Web",
    label: "WEB EXPERIENCE",
    description:
      "A fresh digital experience for authentic pizza, with customer loyalty built in.",
    stack: ["React", "Firebase", "Web"],
    url: import.meta.env.VITE_PIZZERIA_URL,
    detail:
      "A modern pizza shop website with a focus on a welcoming browsing experience and customer loyalty functionality. Built with React and Firebase.",
  },
  {
    id: "erp",
    title: "ERP / Admin Console",
    category: "Dashboard",
    label: "BUSINESS APPLICATION",
    description:
      "Making complex business operations feel simple. Data, insights, and control in one place.",
    stack: ["Flutter", "REST APIs", "Dashboard"],
    url: import.meta.env.VITE_ERP_URL,
    detail:
      "A business management dashboard that connects backend APIs with a modern interface. Designed to bring operational data, analytics, and everyday business tools into one workspace.",
  },
  {
    id: "hrms",
    title: "Dazzles HRMS",
    category: "Mobile",
    label: "HR & WORKFORCE",
    description:
      "Attendance, leave requests, and workplace updates. A connected employee experience.",
    stack: ["Mobile", "HRMS", "QR Check-in"],
    url: "https://play.google.com/store/apps/details?id=com.crisant.dazzleshrms&hl=en_IN",
    detail:
      "An HR application with attendance tracking, QR-based check-in and check-out, leave requests, notifications, and company announcements.",
  },
];
export type Project = (typeof projects)[number];
export const experience = [
  {
    role: "Flutter Developer",
    company: "Crisant Technologies",
    location: "Mysore, Karnataka",
    period: "Oct 2025 – Present",
    type: "Enterprise mobile development",
    description:
      "Sole developer of Dazzles, a role-based enterprise management application for the textile industry, released on Google Play and the App Store.",
    tasks: [
      "Built with Clean Architecture and Riverpod, covering 5+ user roles and 10+ feature modules with full release ownership.",
      "Architected a persistent WebSocket client with exponential-backoff reconnect, delivering visitor tracking events at sub-200ms latency.",
      "Delivered visitor check-in/check-out workflows with instant admin sync and FCM notifications, supporting 100+ daily check-ins.",
      "Integrated barcode and QR scanning with Dio and Retrofit product lookups across 500+ SKUs, reducing entry errors by 90%.",
      "Established TDD practices with 40+ unit and widget tests and no critical regressions across 6+ production releases.",
    ],
  },
  {
    role: "Flutter Developer Intern",
    company: "Bridgeon Solutions",
    location: "Kochi, Kerala",
    period: "Jan 2025 – Sep 2025",
    type: "Cross-platform application development",
    description:
      "Delivered mobile features across educational institution management and social media applications in an Agile/Scrum team.",
    tasks: [
      "Built responsive Flutter and Dart interfaces with 15+ reusable widgets, reducing feature development time by approximately 30%.",
      "Integrated REST APIs and managed state using Provider and GetX across 8+ live project modules.",
      "Delivered 8+ modules end-to-end, from UI to API integration, across 2 live projects during a 9-month internship.",
      "Reduced redundant widget rebuilds and average frame rendering time by 25%, achieving consistent 60fps on mid-range Android devices.",
      "Completed 3 sprints per month under senior engineering guidance, contributing reviewed production code across 2 live client projects.",
    ],
  },
  {
    role: "Developer Associate",
    company: "Maathra Technologies",
    location: "Kochi, Kerala",
    period: "Sep 2023 – Apr 2024",
    type: "Oracle APEX & ERP development",
    description:
      "Built database solutions, ERP modules, and integrations using Oracle SQL, PL/SQL, and Oracle APEX.",
    tasks: [
      "Optimised 20+ queries across 5+ ERP modules, reducing data retrieval time by approximately 35% for 3 client departments.",
      "Engineered 4 Oracle APEX ERP modules with dashboards, automated reports, and business workflows, reducing manual reporting effort by 50%.",
      "Delivered 3 data migration pipelines and 2 third-party integrations, migrating 100,000+ records with 99.9% data integrity.",
    ],
  },
];

export const appleLinks: Record<string, string> = {
  dazzles: "https://apps.apple.com/in/app/dazzles/id6746066647",
  hrms: "https://apps.apple.com/in/app/dazzles-hrms/id6758428380",
};
