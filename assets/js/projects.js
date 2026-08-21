/* =====================================================================
   MAHENDRAN — PROJECT DATA
   Single source of truth for the 8 featured projects (3 web apps,
   3 mobile apps, 2 websites), sourced from the real project image
   folders and portfolio PDF. Unverified specifics (year, quantified
   results) are left as clearly marked placeholders rather than
   invented. Two verified metrics (Smart Wheel, AI Tennis Coach) come
   directly from the résumé.
===================================================================== */

const PROJECTS = [
  {
    slug: "project-01",
    featured: true,
    folder: "web-apps",
    href: "projects/web-apps/project-01/index.html",
    index: "01",
    title: "Smart Wheel",
    category: "Web & Mobile",
    categories: ["web-app", "mobile-app"],
    year: "[Add project year]",
    role: "Lead UI/UX Designer",
    services: ["Web App Design", "Mobile App Design", "UI/UX Design"],
    platform: "Web & Mobile",
    timeline: "[Add project timeline]",
    tags: ["Web & Mobile", "Fleet / SaaS"],
    image: "assets/images/projects/web-apps/project-01/cover-work.webp",
    gallery: [
      "assets/images/projects/web-apps/project-01/image-01.webp",
      "assets/images/projects/web-apps/project-01/image-02.webp",
      "assets/images/projects/web-apps/project-01/image-03.webp",
      "assets/images/projects/web-apps/project-01/image-04.webp"
    ],
    shortDesc: "A vehicle tracking system for the USA market, spanning both web sign-in and mobile-first interfaces for live GPS tracking and fleet monitoring.",
    overview: "Smart Wheel is a vehicle tracking system built for the USA market, with both a web sign-in experience and mobile-first interfaces designed in Figma and Adobe XD, covering real-time GPS tracking, geofencing alerts, driver behavior analytics, and vehicle health monitoring.",
    problem: "Fleet owners needed live visibility into vehicle location and condition from both a desktop sign-in portal and their phones, without either experience feeling like an afterthought to the other.",
    goal: "Design a consistent Smart Wheel experience across web and mobile that makes live GPS data, geofencing alerts, and vehicle health genuinely usable on any screen.",
    process: "Designed the web sign-in and account experience alongside the mobile-first tracking interfaces in parallel, keeping the map and alert feed central to both, so switching between desktop and mobile never feels like a different product.",
    uxui: "A clean, brand-consistent sign-in flow on web paired with a map-centered mobile interface with clear alert states for geofencing and vehicle health.",
    outcome: "Improved system usability that boosted adoption of live tracking features by 40%.",
    metrics: [
      { num: "40%", cap: "Increase in live tracking feature adoption" },
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" }
    ]
  },
  {
    slug: "project-02",
    featured: true,
    folder: "mobile-apps",
    href: "projects/mobile-apps/project-02/index.html",
    index: "02",
    title: "JewelOne",
    category: "Mobile",
    categories: ["mobile-app"],
    year: "[Add project year]",
    role: "Lead UI/UX Designer",
    services: ["Mobile App Design", "UI/UX Design"],
    platform: "Mobile App",
    timeline: "[Add project timeline]",
    tags: ["Mobile App", "FinTech"],
    image: "assets/images/projects/mobile-apps/project-02/cover.webp",
    gallery: [
      "assets/images/projects/mobile-apps/project-02/image-01.webp",
      "assets/images/projects/mobile-apps/project-02/image-02.webp",
      "assets/images/projects/mobile-apps/project-02/image-03.webp",
      "assets/images/projects/mobile-apps/project-02/image-04.webp"
    ],
    shortDesc: "A digital gold app that lets users buy, hold, and track jewellery-backed gold purchases from their phone.",
    overview: "JewelOne is a digital gold mobile app that lets users buy and track gold \u2014 priced live per gram \u2014 to build purchasing power toward real jewellery, positioned around the line \"Empowering Your Jewellery Purchases.\"",
    problem: "Digital gold investment can feel abstract to first-time users; JewelOne needed to connect that abstract balance to something tangible \u2014 actual jewellery purchasing power.",
    goal: "Make a digital gold balance feel connected to a real, tangible outcome (jewellery ownership) rather than an abstract investment number.",
    process: "Designed the core flow around live gold pricing, purchase, and balance tracking, keeping the path from opening the app to completing a purchase as short as possible.",
    uxui: "A warm, jewellery-brand-appropriate visual style (deep amber and gold tones) with clear live pricing display and a simple, trustworthy purchase flow.",
    outcome: "A mobile experience that connects digital gold investment to a clear, tangible purchasing goal.",
    metrics: [
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" }
    ]
  },
  {
    slug: "project-03",
    featured: true,
    folder: "mobile-apps",
    href: "projects/mobile-apps/project-03/index.html",
    index: "03",
    title: "AESCare",
    category: "Mobile",
    categories: ["mobile-app"],
    year: "[Add project year]",
    role: "Lead UI/UX Designer",
    services: ["Mobile App Design", "UI/UX Design"],
    platform: "Mobile App",
    timeline: "[Add project timeline]",
    tags: ["Mobile App", "Healthcare"],
    image: "assets/images/projects/mobile-apps/project-03/cover.webp",
    gallery: [
      "assets/images/projects/mobile-apps/project-03/image-01.webp",
      "assets/images/projects/mobile-apps/project-03/image-02.webp",
      "assets/images/projects/mobile-apps/project-03/image-03.webp"
    ],
    shortDesc: "A health tracking app pairing a CGM (continuous glucose monitor) with daily stats, an in-app store, and an Arabic-first interface.",
    overview: "AESCare is a health tracking mobile app that connects to a continuous glucose monitor (CGM), giving users daily glucose and weight statistics alongside an in-app store for related health products, built with a fully Arabic, RTL-first interface.",
    problem: "Health monitoring apps need to make clinical data (glucose readings, device countdowns) feel approachable day-to-day, for an Arabic-speaking audience often underserved by RTL-first design.",
    goal: "Turn CGM device data into a daily-use stats dashboard that feels encouraging rather than clinical, fully native in Arabic.",
    process: "Designed the home dashboard around the two numbers users check most \u2014 glucose and weight \u2014 with device status and a lightweight store surfaced without competing for attention, built RTL-first rather than mirrored after an LTR design.",
    uxui: "A warm, approachable interface with clear stat cards and iconography, built natively for Arabic right-to-left reading order.",
    outcome: "A daily health-tracking experience that makes CGM data approachable for Arabic-speaking users.",
    metrics: [
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" }
    ]
  },
  {
    slug: "project-04",
    featured: true,
    folder: "web-apps",
    href: "projects/web-apps/project-04/index.html",
    index: "04",
    title: "BPI Bank",
    category: "Web App",
    categories: ["web-app"],
    year: "[Add project year]",
    role: "Lead UI/UX Designer",
    services: ["Web App Design", "UI/UX Design"],
    platform: "Web App",
    timeline: "[Add project timeline]",
    tags: ["Web App", "Finance"],
    image: "assets/images/projects/web-apps/project-04/cover.webp",
    gallery: [
      "assets/images/projects/web-apps/project-04/image-01.webp",
      "assets/images/projects/web-apps/project-04/image-02.webp",
      "assets/images/projects/web-apps/project-04/image-03.webp"
    ],
    shortDesc: "A banking web application interface for account access, loan services, and everyday banking tasks.",
    overview: "BPI Bank is a banking web application giving customers a clean interface for everyday account access, current account features, and banking tasks \u2014 built to feel trustworthy without being overwrought.",
    problem: "A banking product needs an interface customers trust immediately, while still making routine tasks like opening a current account or checking features fast and low-friction.",
    goal: "Design a web banking interface that reads as secure and professional, without slowing customers down on routine, frequent tasks.",
    process: "Structured the interface around the small number of tasks customers do most often \u2014 starting an account, checking features and alerts \u2014 keeping less-frequent actions available but out of the way.",
    uxui: "A confident red-and-white interface consistent with typical banking conventions customers already trust, with clear feature call-outs and legible account information.",
    outcome: "A banking web interface that balances the trust customers expect from financial software with fast access to routine account tasks.",
    metrics: [
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" }
    ]
  },
  {
    slug: "project-05",
    featured: true,
    folder: "mobile-apps",
    href: "projects/mobile-apps/project-05/index.html",
    index: "05",
    title: "Tennis Coach AI",
    category: "Mobile",
    categories: ["mobile-app"],
    year: "[Add project year]",
    role: "Lead UI/UX Designer",
    services: ["Mobile App Design", "UI/UX Design"],
    platform: "Mobile App",
    timeline: "[Add project timeline]",
    tags: ["Mobile App", "Sports / AI"],
    image: "assets/images/projects/mobile-apps/project-05/cover.webp",
    gallery: [
      "assets/images/projects/mobile-apps/project-05/image-01.webp",
      "assets/images/projects/mobile-apps/project-05/image-02.webp",
      "assets/images/projects/mobile-apps/project-05/image-03.webp"
    ],
    shortDesc: "A data-driven sports training app using AI/ML-powered motion tracking, progress dashboards, and gamified user flows.",
    overview: "Tennis Coach AI is a sports training mobile app built around AI/ML-powered motion tracking, with progress dashboards, performance analytics, and gamified user flows designed to keep trainees engaged.",
    problem: "Motion-tracking sports data is only useful if a trainee can actually understand and act on it \u2014 raw performance analytics needed to become something motivating, not just a wall of numbers.",
    goal: "Turn AI-generated motion tracking and performance data into a training experience trainees actually want to keep opening.",
    process: "Designed progress dashboards and performance analytics around clear, digestible visualizations, then layered in gamified flows to reinforce consistent training habits rather than one-off sessions.",
    uxui: "An energetic, sport-focused visual style with live on-court overlays (shot analysis, player tracking, rally stats) balanced against approachable, game-like progress indicators.",
    outcome: "Increased active usage among trainees by 45%.",
    metrics: [
      { num: "45%", cap: "Increase in active trainee usage" },
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" }
    ]
  },
  {
    slug: "project-06",
    featured: true,
    folder: "website",
    href: "projects/website/project-06/index.html",
    index: "06",
    title: "PSG Hospital",
    category: "Website",
    categories: ["website"],
    year: "[Add project year]",
    role: "Lead UI/UX Designer",
    services: ["Website Design", "UI/UX Design"],
    platform: "Website",
    timeline: "[Add project timeline]",
    tags: ["Website", "Healthcare"],
    image: "assets/images/projects/website/project-06/cover.webp",
    gallery: [
      "assets/images/projects/website/project-06/image-01.webp",
      "assets/images/projects/website/project-06/image-02.webp",
      "assets/images/projects/website/project-06/image-03.webp"
    ],
    shortDesc: "A multi-specialty hospital website designed for accessible, anxiety-reducing patient navigation.",
    overview: "PSG Hospitals is a leading multi-specialty healthcare institution providing comprehensive medical care with advanced technology and expert professionals. The website design focuses on accessibility, clarity, and seamless navigation for patients and healthcare services.",
    problem: "A large multi-specialty hospital needed a website that patients \u2014 often searching under stress, across a wide age range \u2014 could navigate quickly to find the right department, doctor, or service.",
    goal: "Make accessibility and plain navigation the priority over decoration, so patients reach relevant information in as few steps as possible.",
    process: "Organized the information architecture around patient intent (find a specialty, find a doctor, understand a service, book an appointment) rather than internal hospital department structure.",
    uxui: "A calm, trustworthy visual language with clear typographic hierarchy and quick-access appointment and consultation shortcuts, designed to reduce anxiety rather than add to it.",
    outcome: "A more accessible, easier-to-navigate web presence for patients seeking PSG Hospitals' medical care and services.",
    metrics: [
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" }
    ]
  },
  {
    slug: "project-07",
    featured: true,
    folder: "website",
    href: "projects/website/project-07/index.html",
    index: "07",
    title: "Novaala.AI",
    category: "Website",
    categories: ["website"],
    year: "[Add project year]",
    role: "Lead UI/UX Designer",
    services: ["Website Design", "UI/UX Design"],
    platform: "Website",
    timeline: "[Add project timeline]",
    tags: ["Website", "AI / Consulting"],
    image: "assets/images/projects/website/project-07/cover.webp",
    gallery: [
      "assets/images/projects/website/project-07/image-01.webp",
      "assets/images/projects/website/project-07/image-02.webp",
      "assets/images/projects/website/project-07/image-03.webp"
    ],
    shortDesc: "A business and platform consulting firm's website, built to explain ServiceNow-powered transformation clearly to enterprise clients.",
    overview: "Novaala.AI is a business and platform consulting firm that helps organizations get the most from ServiceNow. The website design centers on clarity, performance, and an engaging user experience across web platforms.",
    problem: "A ServiceNow consulting firm needed a website that made a technical, enterprise-facing offering feel clear and credible to business decision-makers rather than only to a technical audience.",
    goal: "Design a site that communicates consulting capability and trust quickly, structured around clear service phases rather than jargon.",
    process: "Prioritized a clear value proposition above the fold and organized services into distinct phases (Consulting & Implementation, Advisory & Strategic Planning, Managed Services, AI Empowerment & Innovation) so visitors immediately see where they'd start.",
    uxui: "A clean interface with confident typography, a focused blue-based palette, and clearly segmented service cards.",
    outcome: "A clear, engaging web presence that represents Novaala.AI's ServiceNow consulting services credibly to a business audience.",
    metrics: [
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" }
    ]
  },
  {
    slug: "project-08",
    featured: false,
    folder: "website",
    href: "projects/website/project-08/index.html",
    index: "08",
    title: "Sree Kumaran Thangamaligai",
    category: "Website",
    categories: ["website"],
    year: "[Add project year]",
    role: "Lead UI/UX Designer",
    services: ["Website Design", "UI/UX Design", "E-Commerce"],
    platform: "Website",
    timeline: "[Add project timeline]",
    tags: ["Website", "E-Commerce"],
    image: "assets/images/projects/website/project-08/cover.webp",
    gallery: [
      "assets/images/projects/website/project-08/image-01.webp",
      "assets/images/projects/website/project-08/image-02.webp",
      "assets/images/projects/website/project-08/image-03.webp"
    ],
    shortDesc: "A heritage jewellery brand's e-commerce experience for browsing gold, diamond, and silver collections.",
    overview: "Sree Kumaran Thangamaligai is a trusted jewellery brand offering a wide range of gold, diamond, and silver collections with a strong legacy of craftsmanship and purity. The website is designed to deliver a seamless e-commerce experience, showcasing products with clarity and easy navigation.",
    problem: "A heritage jewellery brand needed an online store that carried the same sense of trust, craftsmanship, and purity as its physical showrooms, translated into a digital shopping experience.",
    goal: "Let product photography carry the premium feel while keeping catalog navigation and category structure straightforward.",
    process: "Organized the catalog by collection and material, with clear category navigation so shoppers can move from browsing to a specific product without friction.",
    uxui: "An elegant, product-first interface that lets photography of the jewellery lead, with restrained UI chrome around it.",
    outcome: "A more seamless, trustworthy online shopping experience for Sree Kumaran Thangamaligai's jewellery collections.",
    metrics: [
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" }
    ]
  },
  {
    slug: "project-09",
    featured: false,
    folder: "website",
    href: "projects/website/project-09/index.html",
    index: "09",
    title: "Iron Pulse",
    category: "Website",
    categories: ["website"],
    year: "[Add project year]",
    role: "Lead UI/UX Designer",
    services: ["Website Design", "UI/UX Design"],
    platform: "Website",
    timeline: "[Add project timeline]",
    tags: ["Website", "Fitness"],
    image: "assets/images/projects/website/project-09/cover.webp",
    gallery: [
      "assets/images/projects/website/project-09/image-01.webp",
      "assets/images/projects/website/project-09/image-02.webp",
      "assets/images/projects/website/project-09/image-03.webp"
    ],
    shortDesc: "A modern gym website with a bold, energetic visual style promoting fitness programs and memberships.",
    overview: "A modern gym website designed to promote fitness programs, memberships, and personal training services with a bold and energetic visual style. The user experience focuses on easy navigation, class booking, and motivating users to achieve their fitness goals.",
    problem: "Iron Pulse needed a website that matched the energy of the gym in person — bold and motivating — while still making it simple to check class schedules and memberships.",
    goal: "Balance a bold, energetic visual style with straightforward navigation, so the site motivates without burying the practical information visitors came for.",
    process: "Structured the site around the core visitor actions — explore programs, check class schedules, view membership options — with clear paths to each.",
    uxui: "A high-contrast, motivating visual style using strong imagery and confident typography.",
    outcome: "An energetic, easy-to-navigate website supporting Iron Pulse's class bookings and membership sign-ups.",
    metrics: [
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" }
    ]
  },
  {
    slug: "project-10",
    featured: false,
    folder: "website",
    href: "projects/website/project-10/index.html",
    index: "10",
    title: "Masson Marine",
    category: "Website",
    categories: ["website"],
    year: "[Add project year]",
    role: "Lead UI/UX Designer",
    services: ["Website Design", "UI/UX Design"],
    platform: "Website",
    timeline: "[Add project timeline]",
    tags: ["Website", "Industrial"],
    image: "assets/images/projects/website/project-10/cover.webp",
    gallery: [
      "assets/images/projects/website/project-10/image-01.webp",
      "assets/images/projects/website/project-10/image-02.webp",
      "assets/images/projects/website/project-10/image-03.webp"
    ],
    shortDesc: "An industrial marine propulsion company's website, built for technical precision and global credibility.",
    overview: "Masson Marine provides advanced marine propulsion solutions, combining over a century of engineering expertise with innovative technology. The design focuses on clarity, technical precision, and a seamless user experience for industrial and global audiences.",
    problem: "A century-old marine engineering company needed a website that felt as precise and trustworthy as its hardware, for an international, technically literate audience.",
    goal: "Let product photography and engineering detail carry the visual weight, with a restrained interface structure around it.",
    process: "Organized content around product categories and technical credibility markers, structured for a global audience evaluating a long-term engineering partner.",
    uxui: "A restrained, confident interface that lets product imagery and engineering detail lead.",
    outcome: "A seamless, credible web presence supporting Masson Marine's positioning with industrial and global audiences.",
    metrics: [
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" },
      { num: "[Add metric]", cap: "Verified result pending" }
    ]
  },
];

/* ---- Helpers ---- */
function getProjectBySlug(folder, slug){
  return PROJECTS.find(p => p.folder === folder && p.slug === slug) || null;
}
function getProjectByHref(href){
  return PROJECTS.find(p => p.href === href) || null;
}
function getAdjacentProject(currentHref, direction){
  const i = PROJECTS.findIndex(p => p.href === currentHref);
  if (i === -1) return PROJECTS[0];
  const len = PROJECTS.length;
  const nextIndex = direction === 'prev' ? (i - 1 + len) % len : (i + 1) % len;
  return PROJECTS[nextIndex];
}
